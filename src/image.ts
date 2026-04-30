import sharp, { type AvailableFormatInfo } from 'sharp'

interface ResizeImageParams {
	readonly image: string
	readonly input: string
	readonly output: string
	readonly width: number
	readonly height: number
	readonly name: string
	readonly extension: string
}

export const resizeImage = async (params: ResizeImageParams) => {
	const { image, input, output, width, height, name, extension } = params

	try {
		await sharp(`${input}/${image}`, { animated: true })
			.resize(width, height, { background: 'transparent', fit: 'contain' })
			.toFile(`${output}/${name}${extension}`)

		return `✅ processed and saved: ${name}${extension} `
	} catch (error: any) {
		throw new Error(`❌ error processing ${image} `, { cause: error })
	}
}

export const isFormatInfo = (value: unknown): value is AvailableFormatInfo =>
	typeof value === 'object' && value !== null && 'output' in value && 'id' in value
