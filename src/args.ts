import { parseArgs } from 'node:util'

const { values } = parseArgs({
	allowPositionals: true,
	args: Bun.argv.slice(2),
	options: {
		height: {
			default: Bun.env.HEIGHT,
			short: 'h',
			type: 'string'
		},
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
		size: {
			short: 's',
			type: 'string'
		},
		width: {
			default: Bun.env.WIDTH,
			short: 'w',
			type: 'string'
		}
	},
	strict: true
})

const hasSize = Number(values.size) > 0

// If (hasSize) {
// 	Log.info(`size provided (${values.size}), overriding width and height with it... 🎀\n`)
// }

const rawWidth = hasSize ? values.size : values.width
const rawHeight = hasSize ? values.size : values.height

const width = Number(rawWidth)
const height = Number(rawHeight)
const size = hasSize ? Number(values.size) : undefined
const inputDir = values.input
const outputDir = values.output

const args = { height, inputDir, outputDir, size, width }
export default args
