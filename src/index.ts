import { readdir } from 'node:fs/promises'
import { parse } from 'node:path'

import { intro, log, note, outro } from '@clack/prompts'
import pLimit from 'p-limit'
import Spinnies from 'spinnies'

import { height, input, output as rawOutput, width } from '@/args'
import { getMessage } from '@/error'
import { ensureOutputExists, getOutputPath } from '@/folder'
import { getExtensions, resize } from '@/image'

intro('✨ welcome to media-processor ✨')

const images = await readdir(input, { recursive: true })
note(`found ${images.length} images to process! 🚀`)

const output = await getOutputPath(rawOutput)
await ensureOutputExists(output)

const spinnies = new Spinnies({
	failColor: 'red',
	spinnerColor: 'magenta',
	succeedColor: 'green'
})

const extensions = await getExtensions(images)

const limit = pLimit(10)

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
		}
	})
)

log.message()

const result = await Promise.allSettled(promises)

if (result.some(pr => pr.status === 'rejected')) {
	log.error('yikes, some images failed to process! 😢')
} else {
	log.success('yay! all images processed and saved successfully! 💖')
}

outro('bye 👋')
