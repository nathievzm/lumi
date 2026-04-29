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
			default: Bun.env.INPUT_FOLDER,
			short: 'i',
			type: 'string'
		},
		output: {
			default: Bun.env.OUTPUT_FOLDER,
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

const rawWidth = hasSize ? values.size : values.width
const rawHeight = hasSize ? values.size : values.height

const width = Number(rawWidth)
const height = Number(rawHeight)
const size = hasSize ? Number(values.size) : undefined
const input = values.input
const output = values.output

export { height, input, output, size, width }
