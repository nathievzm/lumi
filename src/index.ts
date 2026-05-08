#!/usr/bin/env bun

import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { intro, log, note, outro } from '@clack/prompts'
import imageExtensions from 'image-extensions'
import pLimit from 'p-limit'
import Spinnies from 'spinnies'

import { cli } from '@/args'
import { getMessage } from '@/error'
import { ensureOutputExists, getInputPath, getOutputPath } from '@/folder'
import { getExtensions, getWidthAndHeight, resize } from '@/image'

intro('✨ welcome to lumi ✨')

const input = getInputPath(cli.input)

const allFiles = await readdir(input, { recursive: true })

const inputFormats = imageExtensions.map(format => `.${format}`)
const validExtensions = new Set(inputFormats)

const images = allFiles.filter(file => {
	const { ext } = parse(file)
	return validExtensions.has(ext.toLowerCase())
})

if (images.length === 0) {
	log.error('yikes! no valid images found in the input folder 😭')
	outro('please add some images to the input folder and try again 👋')
	process.exit(1)
}

note(`found ${images.length} images to process! 🚀`)

const output = await getOutputPath(cli.output)
await ensureOutputExists(output)

const { width, height } = await getWidthAndHeight(cli.width, cli.height)

const spinnies = new Spinnies({
	failColor: 'red',
	spinnerColor: 'magenta',
	succeedColor: 'green'
})

const extensions = await getExtensions(images, cli.format)
const limit = pLimit({ concurrency: cli.limit || 10, rejectOnClear: true })

const promises = images.map(image =>
	limit(async () => {
		spinnies.add(image, { text: `🔃 processing: ${image}` })

		const { name, ext } = parse(image)
		const extension = extensions['default'] ?? extensions[ext] ?? '.png'

		try {
			const result = await resize({ extension, height, image, input, name, output, width })
			spinnies.succeed(image, { text: result })
		} catch (error: unknown) {
			const message = getMessage(error)
			spinnies.fail(image, { text: message })
			throw error
		}
	})
)

log.message()

const result = await Promise.allSettled(promises)
let outroMessage = ''

if (result.some(pr => pr.status === 'rejected')) {
	log.error('yikes, some images failed to process! 😢')
	outroMessage = 'please check the error messages above and try again 🛠️'
} else {
	log.success('yay! all images processed and saved successfully! 💖')
	outroMessage = 'bye 👋'
}

outro(outroMessage)
