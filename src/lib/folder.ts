import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

import { cancel, group, log, path, text } from '@clack/prompts'

export const getOutputPath = (output: string) => {
	if (output) {
		log.message(`output folder provided: ${output}`)
		return Promise.resolve(output)
	}
	return askOutputPath()
}

export const ensureOutputExists = async (outputPath: string) => {
	const outputExists = await exists(outputPath)

	if (!outputExists) {
		await mkdir(outputPath, { recursive: true })
	}

	log.message(`output folder ready: ${outputPath} ✅\n`, { spacing: 0 })
}

export const askOutputPath = async () => {
	const result = await group(
		{
			location: () =>
				path({
					directory: true,
					message: 'where do you want to save the images? 📂',
					root: process.cwd(),
					validate: value => {
						if (value === null || value?.trim().length === 0) {
							return 'folder path is required'
						}
						return undefined
					}
				}),
			name: () =>
				text({
					message: 'how do you wish to name the output folder? 🏷️',
					placeholder: 'output',
					validate: value => {
						if (value === null || value?.trim().length === 0) {
							return 'folder name is required'
						}
						return undefined
					}
				})
		},
		{
			onCancel: () => {
				cancel('operation cancelled by the user! 💀')
				process.exit(0)
			}
		}
	)

	return join(result.location, result.name)
}
