import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { type Option, cancel, group, intro, log, note, outro, select } from '@clack/prompts'
import sharp from 'sharp'
import Spinnies from 'spinnies'

import { height, input, output as rawOutput, size, width } from './args'
import { getErrorMessage } from './error'
import { getOutputFolder } from './folder'
import { isFormatInfo, resizeImage } from './image'

intro('✨ welcome to media-processor ✨')

const output = await getOutputFolder(rawOutput)

note(
	`input: ${input}
output: ${output}
width: ${width}
height: ${height}
size: ${size}`,
	'🎀 parsed input 🎀'
)

const images = await readdir(input, { recursive: true })
log.info(`found ${images.length} images to process! 🚀\n`)

const spinnies = new Spinnies({
	failColor: 'red',
	spinnerColor: 'magenta',
	succeedColor: 'green'
})

const extensions = [
	...new Set(
		images.flatMap(image => {
			const file = parse(image)
			return file.ext ? file.ext.toLowerCase() : ''
		})
	)
].filter(Boolean)

const sharpFormats = Object.values(sharp.format).filter(format => isFormatInfo(format))
const formats: Option<string>[] = sharpFormats
	.filter(format => format.output.file)
	.map(format => ({ label: format.id, value: `.${format.id}` }))

const promptGroups: Record<string, () => Promise<string | symbol>> = {}

for (const extension of extensions) {
	if (!extension) {
		continue
	}

	promptGroups[extension] = () =>
		select({
			message: `what format do you want to use for ${extension} files? 🎨`,
			options: formats
		})
}

const choices = await group(promptGroups, {
	onCancel: () => {
		cancel('operation cancelled by the user! 😢')
		process.exit(0)
	}
})

const promises = images.map(async image => {
	spinnies.add(image, { text: `🔃 processing: ${image}` })

	const { name, ext } = parse(image)
	const extension = choices[ext.toLowerCase()] ?? '.png'

	try {
		const result = await resizeImage({ extension, height, image, input, name, output, width })
		spinnies.succeed(image, { text: result })
	} catch (error: unknown) {
		const message = getErrorMessage(error)
		spinnies.fail(image, { text: message })
	}
})

log.message()

const result = await Promise.allSettled(promises)

if (result.some(pr => pr.status === 'rejected')) {
	log.error('yikes, some images failed to process! 😢')
} else {
	log.success('yay! all images processed and saved successfully! 💖')
}

outro('bye 👋')
