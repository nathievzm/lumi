import { exists, mkdir } from 'node:fs/promises'

import { log } from '@clack/prompts'

import { askInputPath, askOutputPath } from '@/prompt'

export const getInputPath = (input: string) => {
	if (input) {
		log.info(`input folder provided: ${input}`)
		return Promise.resolve(input)
	}

	return askInputPath()
}

export const getOutputPath = (output: string) => {
	if (output) {
		log.info(`output folder provided: ${output}`)
		return Promise.resolve(output)
	}
	return askOutputPath()
}

export const ensureOutputExists = async (output: string) => {
	const outputExists = await exists(output)

	if (!outputExists) {
		await mkdir(output, { recursive: true })
	}

	log.info(`output folder ready: ${output} ✅\n`, { spacing: 0 })
}
