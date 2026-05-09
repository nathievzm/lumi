import { exists, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { log } from '@clack/prompts'

/**
 * Resolves the input directory path.
 *
 * If a path is provided via CLI arguments, it uses that path and logs it.
 * Otherwise, it prompts the user to enter an input path.
 *
 * @param input - The input path provided via CLI, if any.
 *
 * @returns A promise that resolves to the chosen input path string.
 */
export const getInputPath = (input?: string) => {
	if (input !== undefined && input !== '') {
		log.info(`input folder provided: ${input} 📂`)
		return input
	}

	const currentFolder = cwd()
	log.info(`using current folder as input: ${currentFolder} 📂`)

	return currentFolder
}

/**
 * Resolves the output directory path.
 *
 * If a path is provided via CLI arguments, it uses that path and logs it.
 * Otherwise, it prompts the user to enter an output path.
 *
 * @param output - The output path provided via CLI, if any.
 *
 * @returns A promise that resolves to the chosen output path string.
 */
export const getOutputPath = (output?: string) => {
	if (output !== undefined && output !== '') {
		log.info(`output folder provided: ${output} 📂`)
		return output
	}

	const defaultOutput = resolve('output')
	log.info(`using default output folder: ${defaultOutput} 📂`)

	return defaultOutput
}

/**
 * Ensures that the specified output directory exists.
 *
 * If the directory does not exist, it creates it recursively.
 * Logs a confirmation message once the folder is ready.
 *
 * @param output - The path to the output directory.
 *
 * @returns A promise that resolves when the directory is verified or created.
 */
export const ensureOutputExists = async (output: string) => {
	const outputExists = await exists(output)

	if (!outputExists) {
		await mkdir(output, { recursive: true })
	}

	log.info(`output folder ready: ${output} ✅\n`, { spacing: 0 })
}
