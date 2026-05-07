import { join, parse } from 'node:path'

import { type Option } from '@clack/prompts'
import sharp, { type AvailableFormatInfo } from 'sharp'

import { askExtensions, askWidthAndHeight } from '@/prompt'

/**
 * Parameters for the image resizing operation.
 */
interface ResizeParams {
	/**
	 * The relative path of the image within the input directory.
	 */
	readonly image: string
	/**
	 * The absolute or relative path to the input directory.
	 */
	readonly input: string
	/**
	 * The absolute or relative path to the output directory.
	 */
	readonly output: string
	/**
	 * The target width for the resized image.
	 */
	readonly width: number
	/**
	 * The target height for the resized image.
	 */
	readonly height: number
	/**
	 * The filename (without extension) for the output file.
	 */
	readonly name: string
	/**
	 * The target file extension (e.g., '.png', '.webp') for the output file.
	 */
	readonly extension: string
}

/**
 * Type guard to check if a value is a Sharp AvailableFormatInfo object.
 *
 * @param value - The value to check.
 *
 * @returns True if the value matches the AvailableFormatInfo structure.
 */
const isFormatInfo = (value: unknown): value is AvailableFormatInfo =>
	typeof value === 'object' && value !== null && 'output' in value && 'id' in value

/**
 * Retrieves the list of image formats supported by Sharp for output.
 *
 * @param type - The type of formats to retrieve ('input' or 'output').
 *
 * @returns An array of options representing the supported formats for the specified type.
 */
export const getSharpFormats = (type: 'input' | 'output') => {
	const sharpFormats = Object.values(sharp.format).filter(format => isFormatInfo(format))
	const formats: Option<string>[] = sharpFormats
		.filter(format => (type === 'input' ? format.input.file : format.output.file))
		.map(format => ({ label: format.id, value: `.${format.id}` }))

	return formats
}

/**
 * Resolves the target width and height for image processing.
 *
 * If both dimensions are provided via CLI and are valid, they are used.
 * Otherwise, it prompts the user to enter the desired dimensions.
 *
 * @param width - The width provided via CLI.
 * @param height - The height provided via CLI.
 *
 * @returns A promise that resolves to an object containing the width and height.
 */
export const getWidthAndHeight = (width: number, height: number) => {
	const notWidth = isNaN(width) || width <= 0
	const notHeight = isNaN(height) || height <= 0

	if (notWidth && notHeight) {
		return askWidthAndHeight()
	}

	return Promise.resolve({ height, width })
}

/**
 * Determines the output extensions for a set of images.
 *
 * If a global format is specified, it returns that format as the default for all images.
 * Otherwise, it identifies the unique extensions present in the input images and prompts
 * the user to map each original extension to a desired output format.
 *
 * @param images - An array of image filenames to analyze.
 * @param format - An optional global output format.
 *
 * @returns A promise that resolves to a record mapping input extensions to output formats.
 */
export const getExtensions = (images: readonly string[], format?: string) => {
	if (format !== undefined && format !== '') {
		return Promise.resolve({ default: format } as Record<string, string>)
	}

	const extensions = [
		...new Set(
			images.flatMap(image => {
				const file = parse(image)
				return file.ext ? file.ext.toLowerCase() : ''
			})
		)
	].filter(Boolean)

	const formats = getSharpFormats('output')
	return askExtensions(extensions, formats)
}

/**
 * Resizes an image using the Sharp library.
 *
 * Handles both static and animated images (e.g., GIFs, WebP), maintaining
 * aspect ratio with a 'contain' fit and transparent background where applicable.
 *
 * @param params - The parameters for the resize operation.
 *
 * @returns A promise that resolves to a success message string.
 * @throws Error if the image processing fails.
 */
export const resize = async (params: ResizeParams) => {
	const { image, input, output, width, height, name, extension } = params

	try {
		const inputPath = join(input, image)
		const outputPath = join(output, `${name}${extension}`)

		await sharp(inputPath, { animated: true })
			.resize(width, height, { background: 'transparent', fit: 'contain' })
			.toFile(outputPath)

		return `✅ processed and saved: ${name}${extension} `
	} catch (error: any) {
		throw new Error(`❌ error processing ${image} `, { cause: error })
	}
}
