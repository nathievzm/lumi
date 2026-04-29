import { parse } from 'node:path'

import sharp from 'sharp'

interface ResizeImageParams {
	image: string
	input: string
	output: string
	width: number
	height: number
}

export const resizeImage = async (params: ResizeImageParams) => {
	const { image, input, output, width, height } = params

	const file = parse(image)
	const extension = file.ext === '.gif' ? '.webp' : '.png'

	try {
		await sharp(`${input}/${image}`, { animated: true })
			.resize(width, height, { background: 'transparent', fit: 'contain' })
			.toFile(`${output}/${file.name}${extension}`)

		return `✅ processed and saved: ${file.name}${extension} `
	} catch (error: any) {
		throw new Error(`❌ error processing ${image} `, { cause: error })
	}
}
