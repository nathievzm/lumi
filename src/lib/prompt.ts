import { exit } from 'node:process'

import { type Option, cancel, group, select, text } from '@clack/prompts'
import color from 'picocolors'

/**
 * Validates the number of matches found in the user input.
 *
 * @param matches - An array of numeric strings extracted from the input, or null/undefined.
 *
 * @returns An error message string if validation fails, or undefined if it passes.
 */
const validateMatches = (matches: readonly string[] | null | undefined) => {
    if (!matches || matches.length === 0) {
        return 'please enter at least one valid positive number 🚫'
    }

    if (matches.length > 2) {
        return 'please enter at most two numbers (width and height) 🚫'
    }

    return undefined
}

/**
 * Validates that the provided dimensions are within acceptable limits for image processing.
 *
 * @param width - The target width in pixels.
 * @param height - The target height in pixels.
 *
 * @returns An error message string if the dimensions are invalid, or undefined if they pass.
 */
const validateLimits = (width: number, height: number) => {
    if (width <= 0 || height <= 0) {
        return 'dimensions must be greater than zero 🚫'
    }

    if (width > 16_383 || height > 16_383) {
        return 'dimensions must be less than 16_384 pixels 🚫'
    }

    return undefined
}

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
        validate: value => {
            const matches = value?.match(regex)
            const matchError = validateMatches(matches)

            // If the regex parsing failed or gave bad counts, return the error early 🛡️
            if (matchError !== undefined || !matches) {
                return matchError
            }

            const width = Number(matches[0])
            const height = matches[1] === undefined ? width : Number(matches[1])

            // Delegate the final math check to our helper ✨
            return validateLimits(width, height)
        }
    })

    if (typeof result === 'symbol') {
        cancel('operation cancelled by the user! 💀')
        exit(0)
    }

    const matches = result.match(regex) ?? []

    const width = Number(matches[0])
    const height = matches[1] === undefined ? width : Number(matches[1])

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

        promptGroups[extension] = () => {
            const initialValue = formats.some(format => format.value === extension) ? extension : undefined
            return select({
                initialValue,
                message: `what ${color.magenta('format')} do you want to use for ${color.cyan(extension)} files? 🎨`,
                options: [...formats]
            })
        }
    }

    return group(promptGroups, {
        onCancel: () => {
            cancel('operation cancelled by the user! 💀')
            exit(0)
        }
    })
}
