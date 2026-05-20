import { exit } from 'node:process'

import { type Option, cancel, group, select, text } from '@clack/prompts'
import color from 'picocolors'

/**
 * Validates the quantity of numeric matches extracted from the user's dimension input.
 *
 * Ensures the user provides at least one and at most two valid numeric strings.
 *
 * @param matches - A readonly array of numeric strings extracted via regex, or `null`/`undefined` if no matches were
 *   found.
 *
 * @returns An error message string if the validation fails, or `undefined` if the matches are valid.
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
 * Verifies that the parsed dimensions fall within the acceptable boundaries for image processing.
 *
 * Enforces that both dimensions are strictly positive and do not exceed Sharp's maximum pixel limit.
 *
 * @param width - The target width in pixels.
 * @param height - The target height in pixels.
 *
 * @returns An error message string detailing the failure reason, or `undefined` if the dimensions are valid.
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
 * Interactively prompts the user to provide the target width and height for the processed images.
 *
 * Parses the input to support either a single value (for square dimensions) or two values
 * (for specific width and height). If the user cancels the prompt, the process exits.
 *
 * @returns A promise resolving to an object containing the validated, numeric `width` and `height`.
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
 * Interactively prompts the user to select a desired output format for each unique input file extension.
 *
 * Dynamically constructs a series of selection prompts based on the provided list of extensions.
 * If the user cancels any of the prompts, the process exits.
 *
 * @param extensions - A readonly array of unique file extensions detected in the input images.
 * @param formats - A readonly array of output format options supported by the Sharp library.
 *
 * @returns A promise resolving to a record that maps each original file extension to its selected output format string.
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
