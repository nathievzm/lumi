#!/usr/bin/env bun

import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'
import { exit } from 'node:process'

import { intro, log, note, outro, spinner } from '@clack/prompts'
import { Temporal } from '@js-temporal/polyfill'
import boxen from 'boxen'
import pLimit from 'p-limit'
import color from 'picocolors'
import updateNotifier from 'update-notifier'

import { cli } from '@/args'
import { getMessage } from '@/error'
import { ensureOutputExists, getInputPath, getOutputPath } from '@/folder'
import { getExtensions, getImages, getWidthAndHeight, resize } from '@/image'

import pkg from '../package.json' with { type: 'json' }

const notifier = updateNotifier({ pkg })
notifier.notify({
    boxenOptions: { borderColor: 'magenta', borderStyle: 'round', padding: 1 }
})

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

const input = getInputPath(cli.input)

let allFiles: string[] = []

try {
    allFiles = await readdir(input, { recursive: cli.recursive })
} catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    log.error(`yikes! couldn't read the input folder: ${message} 😢`)
    outro('please check your input path and try again 👋')
    exit(1)
}

const images = getImages(allFiles)

if (images.length === 0) {
    log.error('yikes! no valid images found in the input folder 😭')
    outro('please add some images to the input folder and try again 👋')
    exit(1)
}

note(`found ${color.magenta(images.length)} images to process! 🚀`)

const output = getOutputPath(cli.output)
await ensureOutputExists(output)

let dimensions = { height: 0, width: 0 }

try {
    dimensions = await getWidthAndHeight(cli.width, cli.height)
} catch (error: unknown) {
    const message = getMessage(error)
    log.error(message)
    outro('please check your input dimensions and try again 🛠️')
    exit(1)
}

const { width, height } = dimensions

const extensions = await getExtensions(images, cli.format)
const limit = pLimit({ concurrency: cli.limit || 10, rejectOnClear: true })

const spin = spinner()
spin.start(`processing: ${color.magenta(0)}/${color.magenta(images.length)} images 🔃`)

let processed = 0

const startTime = Temporal.Now.instant()

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

const endTime = Temporal.Now.instant()
const duration = startTime.until(endTime).total('seconds').toFixed(2)

let outroMessage = ''

if (result.some(pr => pr.status === 'rejected')) {
    spin.error(
        `yikes! finished with errors. processed ${color.red(processed)}/${color.red(images.length)} images in ${color.yellow(duration)} seconds 😢`
    )

    for (const pr of result) {
        if (pr.status === 'fulfilled') {
            continue
        }

        const message = getMessage(pr.reason)
        log.error(message)
    }

    outroMessage = 'please check your input files and try again 🛠️'
} else {
    spin.stop(`yay! ${color.green(images.length)} images processed in ${color.green(duration)} seconds! \u26A1\uFE0F`)
    outroMessage = 'bye 👋'
}

outro(color.magenta(outroMessage))
