import { parseArgs } from 'node:util'

const { values } = parseArgs({
	allowPositionals: true,
	args: Bun.argv.slice(2),
	options: {
		format: {
			default: Bun.env.FORMAT,
			short: 'f',
			type: 'string'
		},
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
		limit: {
			default: Bun.env.LIMIT,
			short: 'l',
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
const limit = Number(values.limit)
const { input, output, format } = values

export const cli = { format, height, input, limit, output, width }
