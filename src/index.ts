#!/usr/bin/env bun

import { basename, extname } from 'node:path'
import { exit } from 'node:process'

import { intro, log, note, outro, spinner } from '@clack/prompts'
import boxen from 'boxen'
import pLimit from 'p-limit'
import color from 'picocolors'

import { cli } from '@/args'
import { FolderError, ImageError, LumiError } from '@/error'
import { getInput, getOutput, prepare, readFiles } from '@/folder'
import { getExtensions, getImages, getWidthAndHeight, resize } from '@/image'
import { notifyUpdate } from '@/update'

import pkg from '../package.json' with { type: 'json' }

try {
    void notifyUpdate(pkg)

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
    const images = getImages(allFiles)

    if (images.length === 0) {
        if (!cli.recursive) {
            note('hint: try adding the --recursive flag if your images are in subdirectories 📁', '💡 tip')
        }
        throw new ImageError('no valid images found in the input folder 😭')
    }

    note(`found ${color.magenta(images.length)} images to process! 🚀`)

    const { width, height } = await getWidthAndHeight(cli.width, cli.height)
    const extensions = await getExtensions(images, cli.format)

    const limit = pLimit({ concurrency: cli.limit || 10, rejectOnClear: true })

    const spin = spinner()
    spin.start(`processing: ${color.magenta(0)}/${color.magenta(images.length)} images 🔃`)

    let processed = 0

    const startTime = performance.now()

    const promises = images.map(image =>
        limit(async () => {
            const ext = extname(image)
            const name = basename(image, ext)
            const extension = extensions['default'] ?? extensions[ext] ?? '.png'

            await resize({ extension, height, image, input, name, output, width })

            processed++
            spin.message(`processing: ${color.green(processed)}/${color.magenta(images.length)} images 🔃`)
        })
    )

    log.message()

    const result = await Promise.allSettled(promises)

    const endTime = performance.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    let outroMessage = ''

    if (result.some(pr => pr.status === 'rejected')) {
        spin.error(
            `yikes! finished with errors. processed ${color.red(processed)}/${color.red(images.length)} images in ${color.yellow(duration)} seconds 😢`
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
            `yay! ${color.green(images.length)} images processed in ${color.green(duration)} seconds! \u26A1\uFE0F`
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
    } else {
        log.error(color.red(`unexpected anomaly: ${message} 👽`))
    }

    outro(color.magenta('please check your configuration and try again 👋'))
    exit(1)
}
