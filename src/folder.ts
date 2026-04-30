import { exists, mkdir } from 'node:fs/promises'

import { log, text } from '@clack/prompts'

export const getOutput = async (rawOutput: string) => {
	let output = rawOutput
	const outputExists = await exists(output)

	if (!outputExists) {
		if (output) {
			log.message('oops, output folder missing, creating it for you... 🛠️')
		} else {
			output = await createOutput()
		}
	}

	await mkdir(output, { recursive: true })
	log.step(`output folder ready: ${output} ✅\n`)

	return output
}

export const createOutput = async () => {
	const name = await text({
		message: 'how do you wish to name the output folder? 📁',
		placeholder: 'output',
		validate: value => {
			if (value === null || value?.trim().length === 0) {
				return 'folder name is required'
			}
			return undefined
		}
	})

	return typeof name === 'string' ? name : 'output'
}
