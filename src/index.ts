import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { intro, log, note, outro } from '@clack/prompts'
import Spinnies from 'spinnies'

import { height, input, output as rawOutput, size, width } from './args'
import { getOutputFolder } from './folder'
import { resizeImage } from './image'

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

const extensions = images.flatMap(image => {
	const file = parse(image)
	return file.ext ? file.ext.toLowerCase() : ''
})

console.table(extensions)

const promises = images.map(async image => {
	spinnies.add(image, { text: `🔃 processing: ${image}` })

	try {
		const result = await resizeImage({ height, image, input, output, width })
		spinnies.succeed(image, { text: result })
	} catch (error: unknown) {
		let errorMessage = 'an unknown error occurred'

		if (error instanceof Error) {
			errorMessage = error.message
		} else if (typeof error === 'string') {
			errorMessage = error
		}

		spinnies.fail(image, { text: errorMessage })
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
