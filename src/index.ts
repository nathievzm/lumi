#!/usr/bin/env bun

import { basename, extname } from 'node:path'
import { exit } from 'node:process'

import { intro, log, note, outro, spinner } from '@clack/prompts'
import boxen from 'boxen'
import pLimit from 'p-limit'
import color from 'picocolors'

import { cli } from '@/args'
import { FolderError, ImageError, LumiError, VideoError } from '@/error'
import { getInput, getOutput, prepare, readFiles } from '@/folder'
import { getExtensions, getMedia, getWidthAndHeight, resize } from '@/image'
import { notifyUpdate } from '@/update'
import { canConvertToWebm, convertToWebm, isVideoExtension, isWebmTarget } from '@/video'

import pkg from '../package.json' with { type: 'json' }

interface ProcessMediaParams {
    readonly extensions: Readonly<Record<string, string>>
    readonly height: number
    readonly image: string
    readonly input: string
    readonly output: string
    readonly width: number
}

interface SharpImageTarget {
    readonly ext: string
    readonly extension: string
    readonly name: string
}

const processWebm = async (params: Readonly<ProcessMediaParams>, ext: string, name: string) => {
    if (!canConvertToWebm(ext)) {
        throw new VideoError(`${params.image} cannot be converted to .webm. only gifs and videos are supported`)
    }

    await convertToWebm({
        height: params.height,
        input: params.input,
        name,
        output: params.output,
        video: params.image,
        width: params.width
    })
}

const processSharpImage = async (params: Readonly<ProcessMediaParams>, target: Readonly<SharpImageTarget>) => {
    if (isVideoExtension(target.ext)) {
        throw new VideoError(`${params.image} is a video and can only be converted to .webm`)
    }

    await resize({
        extension: target.extension,
        height: params.height,
        image: params.image,
        input: params.input,
        name: target.name,
        output: params.output,
        width: params.width
    })
}

const processMedia = async (params: Readonly<ProcessMediaParams>) => {
    const { extensions, height, image, input, output, width } = params
    const ext = extname(image).toLowerCase()
    const name = basename(image, ext)
    const extension = extensions['default'] ?? extensions[ext] ?? '.png'
    const mediaParams = { extensions, height, image, input, output, width }

    if (isWebmTarget(extension)) {
        await processWebm(mediaParams, ext, name)
        return
    }

    await processSharpImage(mediaParams, { ext, extension, name })
}

try {
    await notifyUpdate(pkg)

    console.clear()

    const banner = boxen('lumi', {
        backgroundColor: 'magenta',
        borderColor: 'magenta',
        borderStyle: 'round',
        padding: { bottom: 2, left: 15, right: 15, top: 2 },
        textAlignment: 'center'
    })

    console.log(banner, '\n')

    intro(color.magenta(`welcome to lumi v${pkg.version} 🩷`))

    const input = getInput(cli.input)
    const output = getOutput(cli.output)
    await prepare(output)

    const allFiles = await readFiles(input, cli.recursive)
    const media = getMedia(allFiles, input, output)

    if (media.length === 0) {
        const hint = cli.recursive ? '' : ' (try adding the --recursive flag to check subfolders)'
        throw new ImageError(`no valid media files found in the input folder 😭${hint}`)
    }

    note(`found ${color.magenta(media.length)} media files to process! 🚀`)

    const { width, height } = await getWidthAndHeight(cli.width, cli.height)
    const extensions = await getExtensions(media, cli.format)

    const limit = pLimit({ concurrency: cli.limit || 10, rejectOnClear: true })

    const spin = spinner()
    spin.start(`processing: ${color.magenta(0)}/${color.magenta(media.length)} media files 🔃`)

    let processed = 0

    const startTime = performance.now()

    const promises = media.map(image =>
        limit(async () => {
            await processMedia({ extensions, height, image, input, output, width })

            processed++
            spin.message(`processing: ${color.green(processed)}/${color.magenta(media.length)} media files 🔃`)
        })
    )

    log.message()

    const result = await Promise.allSettled(promises)

    const endTime = performance.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    let outroMessage = ''

    if (result.some(pr => pr.status === 'rejected')) {
        spin.error(
            `yikes! finished with errors. processed ${color.red(processed)}/${color.red(media.length)} media files in ${color.yellow(duration)} seconds 😢`
        )

        for (const pr of result) {
            if (pr.status === 'fulfilled') {
                continue
            }

            const message = LumiError.getMessage(pr.reason)
            log.error(color.red(message))
        }

        outroMessage = 'please check your input files and try again 🛠️'
    } else {
        spin.stop(
            `yay! ${color.green(media.length)} media files processed in ${color.green(duration)} seconds! \u26A1\uFE0F`
        )
        outroMessage = 'bye 👋'
    }

    outro(color.magenta(outroMessage))
} catch (error) {
    const message = LumiError.getMessage(error)

    if (error instanceof FolderError) {
        log.error(color.red(`folder issue: ${message}`))
    } else if (error instanceof ImageError) {
        log.error(color.red(`image issue: ${message}`))
    } else if (error instanceof VideoError) {
        log.error(color.red(`video issue: ${message}`))
    } else {
        log.error(color.red(`unexpected anomaly: ${message} 👽`))
    }

    outro(color.magenta('please check your configuration and try again 👋'))
    exit(1)
}
