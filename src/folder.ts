import { exists, mkdir } from 'node:fs/promises'

import { log, text } from '@clack/prompts'

export const getOutputFolder = async (rawOutput: string) => {
	let output = rawOutput
	const outputExists = await exists(output)

	if (!outputExists) {
		if (output) {
			log.info('oops, output folder missing, creating it for you... 🛠️')
		} else {
			output = await createOutputFolder()
		}
	}

	await mkdir(output, { recursive: true })
	log.success(`output folder ready: ${output} ✅\n`)

	return output
}

export const createOutputFolder = async () => {
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
