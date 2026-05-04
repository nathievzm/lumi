import { join, parse } from 'node:path'

import { type Option } from '@clack/prompts'
import sharp, { type AvailableFormatInfo } from 'sharp'

import { askExtensions, askWidthAndHeight } from '@/prompt'

interface ResizeParams {
	readonly image: string
	readonly input: string
	readonly output: string
	readonly width: number
	readonly height: number
	readonly name: string
	readonly extension: string
}

const isFormatInfo = (value: unknown): value is AvailableFormatInfo =>
	typeof value === 'object' && value !== null && 'output' in value && 'id' in value

const getSharpFormats = () => {
	const sharpFormats = Object.values(sharp.format).filter(format => isFormatInfo(format))
	const formats: Option<string>[] = sharpFormats
		.filter(format => format.output.file)
		.map(format => ({ label: format.id, value: `.${format.id}` }))

	return formats
}

export const getWidthAndHeight = (width: number, height: number) => {
	const notWidth = isNaN(width) || width <= 0
	const notHeight = isNaN(height) || height <= 0

	if (notWidth && notHeight) {
		return askWidthAndHeight()
	}

	return Promise.resolve({ height, width })
}

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

	const formats = getSharpFormats()
	return askExtensions(extensions, formats)
}

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
