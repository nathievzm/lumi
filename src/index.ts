import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { intro, log, note, outro } from '@clack/prompts'
import Spinnies from 'spinnies'

import { height, input, output as rawOutput, width } from './args'
import { getMessage } from './error'
import { getOutput } from './folder'
import { getExtensions, resize } from './image'

intro('✨ welcome to media-processor ✨')

const output = await getOutput(rawOutput)

const images = await readdir(input, { recursive: true })
note(`found ${images.length} images to process! 🚀`)

const spinnies = new Spinnies({
	failColor: 'red',
	spinnerColor: 'magenta',
	succeedColor: 'green'
})

const extensions = await getExtensions(images)

const promises = images.map(async image => {
	spinnies.add(image, { text: `🔃 processing: ${image}` })

	const { name, ext } = parse(image)
	const extension = extensions['default'] ?? extensions[ext] ?? '.png'

	try {
		const result = await resize({ extension, height, image, input, name, output, width })
		spinnies.succeed(image, { text: result })
	} catch (error: unknown) {
		const message = getMessage(error)
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
