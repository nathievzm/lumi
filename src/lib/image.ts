import { extname, join } from 'node:path'

import { type Option } from '@clack/prompts'
import imageExtensions from 'image-extensions'
import sharp, { type AvailableFormatInfo } from 'sharp'

import { guard } from './folder'
import { askExtensions, askWidthAndHeight } from './prompt'

/**
 * Configuration parameters required for the image resizing and conversion operation.
 */
interface ResizeParams {
    /**
     * The relative file path of the source image within the input directory.
     */
    readonly image: string
    /**
     * The absolute or relative path to the source directory containing the input images.
     */
    readonly input: string
    /**
     * The absolute or relative path to the destination directory for the processed images.
     */
    readonly output: string
    /**
     * The target width in pixels for the resized image.
     */
    readonly width: number
    /**
     * The target height in pixels for the resized image.
     */
    readonly height: number
    /**
     * The desired filename for the output file, excluding the extension.
     */
    readonly name: string
    /**
     * The target file extension (e.g., '.png', '.webp') dictating the output format.
     */
    readonly extension: string
}

const inputFormats = imageExtensions.map(format => `.${format}`)
const validExtensions = new Set(inputFormats)

/**
 * A type guard to verify if an unknown value conforms to the `AvailableFormatInfo` structure from Sharp.
 *
 * @param value - The unknown value to evaluate.
 *
 * @returns `true` if the value is a valid `AvailableFormatInfo` object, otherwise `false`.
 */
const isFormatInfo = (value: unknown): value is AvailableFormatInfo =>
    typeof value === 'object' && value !== null && 'output' in value && 'id' in value

/**
 * Retrieves a list of image formats supported by the Sharp library for output processing.
 *
 * @returns An array of prompt-compatible `Option` objects representing the supported output formats.
 */
const getSharpFormats = () => {
    const sharpFormats = Object.values(sharp.format).filter(format => isFormatInfo(format))
    const formats: Option<string>[] = sharpFormats
        .filter(format => format.output.file)
        .map(format => ({ label: format.id, value: `.${format.id}` }))

    return formats
}

/**
 * Filters an array of file paths, returning only those with recognized image extensions.
 *
 * @param files - A readonly array of file paths or filenames to filter.
 *
 * @returns An array containing only the file paths that correspond to supported image formats.
 */
export const getImages = (files: readonly string[]) => {
    const images = files.filter(file => {
        const ext = extname(file)
        return validExtensions.has(ext.toLowerCase())
    })

    return images
}

/**
 * Resolves the target width and height for the image processing operation.
 *
 * If valid dimensions (greater than 0) are provided via CLI arguments, they are utilized.
 * If either dimension is missing or invalid, an interactive prompt will request the dimensions from the user.
 *
 * @param width - The target width parsed from CLI arguments.
 * @param height - The target height parsed from CLI arguments.
 *
 * @returns A promise resolving to an object containing the validated `width` and `height`.
 * @throws { Error } If the provided or prompted dimensions exceed Sharp's 16383 pixel limit.
 */
export const getWidthAndHeight = (width: number, height: number) => {
    let finalWidth = width
    let finalHeight = height

    const notWidth = isNaN(finalWidth) || finalWidth <= 0
    const notHeight = isNaN(finalHeight) || finalHeight <= 0

    if (notWidth && notHeight) {
        return askWidthAndHeight()
    }

    finalWidth = notWidth ? finalHeight : finalWidth
    finalHeight = notHeight ? finalWidth : finalHeight

    if (finalWidth > 16_383 || finalHeight > 16_383) {
        throw new Error('dimensions must be less than 16384 pixels 🚫')
    }

    return Promise.resolve({ height: finalHeight, width: finalWidth })
}

/**
 * Determines the target output formats for a collection of input images.
 *
 * If a global format flag is provided, it dictates the default output format for all images.
 * In the absence of a global format, it extracts the unique extensions from the input images
 * and prompts the user to map each original extension to a specific output format interactively.
 *
 * @param images - A readonly array of input image filenames to analyze for unique extensions.
 * @param format - An optional global output format string provided via CLI arguments.
 *
 * @returns A promise resolving to a record that maps input extensions (or 'default') to their chosen output formats.
 */
export const getExtensions = (images: readonly string[], format?: string) => {
    if (format !== undefined && format !== '') {
        return Promise.resolve({ default: format } as Record<string, string>)
    }

    const extensionsSet = new Set<string>()
    for (const image of images) {
        const ext = image ? extname(image) : ''
        if (ext) {
            extensionsSet.add(ext.toLowerCase())
        }
    }
    const extensions = [...extensionsSet]

    const formats = getSharpFormats()
    return askExtensions(extensions, formats)
}

/**
 * Processes an image by resizing and potentially converting its format using the Sharp library.
 *
 * This operation supports both static and animated images (e.g., GIFs, WebP). It maintains
 * the original aspect ratio utilizing a 'contain' fit and applies a transparent background where necessary.
 *
 * @param params - The configuration parameters dictating the resize and conversion operations.
 *
 * @returns A promise that resolves to a descriptive success message upon completion.
 * @throws { Error } If the image processing fails or if a path traversal attempt is detected during output resolution.
 */
export const resize = async (params: ResizeParams) => {
    const { image, input, output, width, height, name, extension } = params

    try {
        const inputPath = join(input, image)
        const outputPath = join(output, `${name}${extension}`)

        guard(output, outputPath)

        await sharp(inputPath, { animated: true })
            .resize(width, height, { background: 'transparent', fit: 'contain' })
            .toFile(outputPath)

        return `processed and saved: ${name}${extension} `
    } catch (error: any) {
        throw new Error(`error processing ${image} `, { cause: error })
    }
}
