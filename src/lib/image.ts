import { parse } from 'node:path'

import { type Option, cancel, group, select } from '@clack/prompts'
import sharp, { type AvailableFormatInfo } from 'sharp'

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

export const resize = async (params: ResizeParams) => {
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

export const getExtensions = (images: readonly string[]) => {
	if (Bun.env.FORMAT !== undefined && Bun.env.FORMAT !== '') {
		return Promise.resolve({ default: Bun.env.FORMAT } as Record<string, string>)
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
	const promptGroups: Record<string, () => Promise<string | symbol>> = {}

	for (const extension of extensions) {
		if (!extension) {
			continue
		}

		promptGroups[extension] = () =>
			select({
				message: `what format do you want to use for ${extension} files? 🎨`,
				options: formats
			})
	}

	return group(promptGroups, {
		onCancel: () => {
			cancel('operation cancelled by the user! 💀')
			process.exit(0)
		}
	})
}
