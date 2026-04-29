import { exists, mkdir, readdir } from 'node:fs/promises'

import { intro, log, note, outro, text } from '@clack/prompts'
import Spinnies from 'spinnies'

import { width, height, input, output as rawOutput, size } from './args'
import { resizeImage } from './images'

intro('✨ welcome to media-processor ✨')

let output = rawOutput
const outputExists = await exists(output)

if (!outputExists) {
	if (!output) {
		const result = await text({
			message: 'how do you wish to name the output directory? 📁',
			placeholder: 'output',
			validate: value => {
				if (!value || value.length === 0) return 'directory name is required'
				return undefined
			}
		})

		output = typeof result === 'string' ? result : 'output'
	} else {
		log.info('oops, output directory missing, creating it for you... 🛠️')
	}

	await mkdir(output, { recursive: true })
	log.success(`output directory ready: ${output} ✅\n`)
}

note(
	`input: ${input}
output: ${output}
width: ${width}
height: ${height}
size: ${size}`,
	'🎀 parsed input 🎀'
)

const images = await readdir(input)
log.info(`found ${images.length} images to process! 🚀\n`)

const spinnies = new Spinnies({
	spinnerColor: 'magenta',
	succeedColor: 'green',
	failColor: 'red'
})

const promises = images.map(async image => {
	spinnies.add(image, { text: `🔃 processing: ${image}` })

	try {
		const result = await resizeImage({ image, input, output, width, height })
		spinnies.succeed(image, { text: result })
	} catch (error: any) {
		spinnies.fail(image, { text: error.message })
	}
})

log.message()

const result = await Promise.allSettled(promises)

if (result.some(r => r.status === 'rejected')) {
	log.error('yikes, some images failed to process! 😢')
} else {
	log.success('yay! all images processed and saved successfully! 💖')
}

outro('bye 👋')
