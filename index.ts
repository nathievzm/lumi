import { exists, mkdir, readdir } from 'node:fs/promises'
import { parse } from 'node:path'
import { parseArgs } from 'node:util'
import sharp from 'sharp'

const { values } = parseArgs({
	allowPositionals: true,
	args: Bun.argv.slice(2),
	options: {
		input: {
			default: Bun.env.INPUT_DIR,
			short: 'i',
			type: 'string'
		},
		output: {
			default: Bun.env.OUTPUT_DIR,
			short: 'o',
			type: 'string'
		},
		width: {
			default: Bun.env.WIDTH,
			short: 'w',
			type: 'string'
		},
		height: {
			default: Bun.env.HEIGHT,
			short: 'h',
			type: 'string'
		},
		size: {
			short: 's',
			type: 'string'
		}
	},
	strict: true
})

const rawWidth = values.size && Number(values.size) > 0 ? values.size : values.width
const rawHeight = values.size && Number(values.size) > 0 ? values.size : values.height

const width = Number(rawWidth)
const height = Number(rawHeight)
const inputDir = values.input
const outputDir = values.output

console.log('\n--- 🎀 parsed input 🎀 ---\n')
console.log(`input: ${inputDir}`)
console.log(`output: ${outputDir}`)
console.log(`width: ${width}`)
console.log(`height: ${height}`)
console.log(`size: ${values.size}`)
console.log('\n--------------------------\n')

try {
	const outputExists = await exists(outputDir)

	if (!outputExists) {
		console.log(`output directory missing, creating it right now... 🎀\n`)
		await mkdir(outputDir, { recursive: true })
	}

	const images = await readdir(inputDir)
	console.log(`found ${images.length} images to process! 🚀\n`)

	const promises = images.map(async (image, index, array) => {
		const file = parse(image)
		const extension = file.ext === '.gif' ? '.webp' : '.png'

		console.log(`🔃 processing: ${file.name} | extension: ${file.ext}`)

		if (index === array.length - 1) {
			console.log('')
		}

		return sharp(`${inputDir}/${image}`, { animated: true })
			.resize(width, height, { background: 'transparent', fit: 'contain' })
			.toFile(`${outputDir}/${file.name}${extension}`)
			.then(() => console.log(`✅ processed and saved: ${file.name}${extension}`))
			.catch(error => console.error(`❌ error processing ${file.name}:`, error))
	})

	await Promise.allSettled(promises)

	console.log('\nyay! all images processed and saved successfully! 💖')
} catch (error) {
	console.error('\noops, error processing images:', error)
}
