import { exit } from 'node:process'

import { type Option, cancel, group, select, text } from '@clack/prompts'
import color from 'picocolors'

/**
 * Prompts the user for the target width and height of the images.
 *
 * Validates that both inputs are positive numbers.
 *
 * @returns A promise that resolves to an object containing the numeric width and height.
 */
export const askWidthAndHeight = async () => {
    const regex = /\d+/gv

    const result = await text({
        message: `what ${color.magenta('dimensions')} do you want for the ${color.magenta('output')} images? 📐`,
        placeholder: 'e.g. "1080" (square) or "1920 1080" (width x height)',
        // eslint-disable-next-line max-statements
        validate: value => {
            const matches = value?.match(regex)

            if (!matches || matches.length === 0) {
                return 'please enter at least one valid positive number 🚫'
            }

            if (matches.length > 2) {
                return 'please enter at most two numbers (width and height) 🚫'
            }

            const width = Number(matches[0])
            const height = matches.length === 2 ? Number(matches[1]) : width

            const isNegative = width <= 0 || height <= 0
            const isTooLarge = width > 16_383 || height > 16_383

            if (isNegative || isTooLarge) {
                return isTooLarge
                    ? 'dimensions cannot exceed 16383 pixels to prevent resource exhaustion 🚫'
                    : 'dimensions must be greater than zero 🚫'
            }

            return undefined
        }
    })

    if (typeof result === 'symbol') {
        cancel('operation cancelled by the user! 💀')
        exit(0)
    }

    const matches = result.match(regex) ?? []

    const width = Number(matches[0])
    const height = matches.length === 2 ? Number(matches[1]) : width

    return { height, width }
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
                message: `what ${color.magenta('format')} do you want to use for ${color.cyan(extension)} files? 🎨`,
                options: [...formats]
            })
    }

    return group(promptGroups, {
        onCancel: () => {
            cancel('operation cancelled by the user! 💀')
            exit(0)
        }
    })
}
