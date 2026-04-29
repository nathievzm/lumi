import { exists, mkdir, readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { intro, log, note, outro, tasks } from '@clack/prompts'
import type { Task } from '@clack/prompts'
import sharp from 'sharp'

import args from './args'

try {
	intro('✨ welcome to media-processor ✨')

	const { width, height, inputDir, outputDir, size } = args

	note(
		`input: ${inputDir}
output: ${outputDir}
width: ${width}
height: ${height}
size: ${size}`,
		'🎀 parsed input 🎀'
	)

	const outputExists = await exists(outputDir)

	if (!outputExists) {
		log.info(`output directory missing, creating it right now... 🎀\n`)
		await mkdir(outputDir, { recursive: true })
	}

	const images = await readdir(inputDir)
	log.info(`found ${images.length} images to process! 🚀\n`)

	const imageTasks: Task[] = images.map(image => {
		const file = parse(image)
		const extension = file.ext === '.gif' ? '.webp' : '.png'

		return {
			task: async () => {
				try {
					await sharp(`${inputDir}/${image}`, { animated: true })
						.resize(width, height, { background: 'transparent', fit: 'contain' })
						.toFile(`${outputDir}/${file.name}${extension}`)

					return `✅ processed and saved: ${file.name}${extension}`
				} catch (error: any) {
					throw new Error(`❌ error processing ${file.name}`, { cause: error })
				}
			},
			title: `🔃 processing: ${file.name} | extension: ${file.ext}`
		}
	})

	await tasks(imageTasks)

	log.message()
	log.success('yay! all images processed and saved successfully! 💖')

	outro('bye 👋')
} catch (error: any) {
	log.error(`\noops, error processing images: ${error}`)
}
