import { join } from 'node:path'

import { type Option, cancel, group, path, select, text } from '@clack/prompts'

/**
 * Prompts the user to select the input directory containing images.
 *
 * Uses a directory picker with validation to ensure a non-empty path is provided.
 * If the user cancels the prompt, the process exits.
 *
 * @returns A promise that resolves to the selected input path string.
 */
export const askInputPath = async () => {
	const result = await path({
		directory: true,
		message: 'where are the images you want to transform? 📂',
		root: process.cwd(),
		validate: value => {
			if (value === null || value?.trim().length === 0) {
				return 'folder path is required'
			}
			return undefined
		}
	})

	if (typeof result === 'symbol') {
		cancel('operation cancelled by the user! 💀')
		process.exit(0)
	}

	return result
}

/**
 * Prompts the user for the output location and folder name.
 *
 * Combines two prompts: one for the parent directory and another for the new folder's name.
 * The results are joined to create a complete output path.
 * If the user cancels either prompt, the process exits.
 *
 * @returns A promise that resolves to the combined output directory path.
 */
export const askOutputPath = async () => {
	const { location, name } = await group(
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

	return join(location, name)
}

/**
 * Prompts the user for the target width and height of the images.
 *
 * Validates that both inputs are positive numbers.
 *
 * @returns A promise that resolves to an object containing the numeric width and height.
 */
export const askWidthAndHeight = async () => {
	const { width, height } = await group({
		height: () =>
			text({
				message: 'what height do you want to use for the output images? 📐',
				placeholder: 'e.g. 600',
				validate: value => {
					const number = Number(value)
					if (isNaN(number) || number <= 0) {
						return 'please enter a valid positive number for height 🚫'
					}
					return undefined
				}
			}),
		width: () =>
			text({
				message: 'what width do you want to use for the output images? 📏',
				placeholder: 'e.g. 800',
				validate: value => {
					const number = Number(value)
					if (isNaN(number) || number <= 0) {
						return 'please enter a valid positive number for width 🚫'
					}
					return undefined
				}
			})
	})

	return { height: Number(height), width: Number(width) }
}

/**
 * Prompts the user to select an output format for each unique file extension found.
 *
 * Dynamically generates a group of selection prompts based on the provided extensions.
 * If the user cancels any selection, the process exits.
 *
 * @param extensions - An array of unique file extensions found in the input.
 * @param formats - An array of available output formats supported by the system.
 *
 * @returns A promise that resolves to a record mapping each original extension to its chosen output format.
 */
export const askExtensions = (extensions: readonly string[], formats: readonly Readonly<Option<string>>[]) => {
	const promptGroups: Record<string, () => Promise<string | symbol>> = {}

	for (const extension of extensions) {
		if (!extension) {
			continue
		}

		promptGroups[extension] = () =>
			select({
				message: `what format do you want to use for ${extension} files? 🎨`,
				options: [...formats]
			})
	}

	return group(promptGroups, {
		onCancel: () => {
			cancel('operation cancelled by the user! 💀')
			process.exit(0)
		}
	})
}
