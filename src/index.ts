#!/usr/bin/env bun

import { readdir } from 'node:fs/promises'
import { basename, extname } from 'node:path'
import { exit } from 'node:process'

import { intro, log, note, outro, spinner } from '@clack/prompts'
import { Temporal } from '@js-temporal/polyfill'
import pLimit from 'p-limit'

import { cli } from '@/args'
import { ensureOutputExists, getInputPath, getOutputPath } from '@/folder'
import { getExtensions, getImages, getWidthAndHeight, resize } from '@/image'

intro('✨ welcome to lumi ✨')

const input = getInputPath(cli.input)

const allFiles = await readdir(input, { recursive: cli.recursive })
const images = getImages(allFiles)

if (images.length === 0) {
    log.error('yikes! no valid images found in the input folder 😭')
    outro('please add some images to the input folder and try again 👋')
    exit(1)
}

note(`found ${images.length} images to process! 🚀`)

const output = getOutputPath(cli.output)
await ensureOutputExists(output)

const { width, height } = await getWidthAndHeight(cli.width, cli.height)

const extensions = await getExtensions(images, cli.format)
const limit = pLimit({ concurrency: cli.limit || 10, rejectOnClear: true })

const progressSpinner = spinner()
progressSpinner.start(`processing: 0/${images.length} images 🔃`)

let processed = 0

const startTime = Temporal.Now.instant()

const promises = images.map(image =>
    limit(async () => {
        const ext = extname(image)
        const name = basename(image, ext)
        const extension = extensions['default'] ?? extensions[ext] ?? '.png'

        await resize({ extension, height, image, input, name, output, width })

        processed++
        progressSpinner.message(`processing: ${processed}/${images.length} images 🔃`)
    })
)

log.message()

const result = await Promise.allSettled(promises)

const endTime = Temporal.Now.instant()
const duration = startTime.until(endTime).total('seconds').toFixed(2)

let outroMessage = ''

if (result.some(pr => pr.status === 'rejected')) {
    progressSpinner.error(`yikes! finished with errors. processed ${processed}/${images.length} images in ${duration} seconds 😢`)
    outroMessage = 'please check your input files and try again 🛠️'
} else {
    progressSpinner.stop(`yay! ${images.length} images processed in ${duration} seconds! ⚡`)
    outroMessage = 'bye 👋'
}

outro(outroMessage)
