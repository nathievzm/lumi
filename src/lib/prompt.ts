import { join } from 'node:path'

import { type Option, cancel, group, path, select, text } from '@clack/prompts'

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
