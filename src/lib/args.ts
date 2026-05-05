import { parseArgs } from 'node:util'

const { values } = parseArgs({
	allowPositionals: true,
	args: Bun.argv.slice(2),
	options: {
		/**
		 * Global output format. Defaults to `FORMAT` env var.
		 */
		format: {
			default: Bun.env.FORMAT,
			short: 'f',
			type: 'string'
		},
		/**
		 * Target height. Defaults to `HEIGHT` env var.
		 */
		height: {
			default: Bun.env.HEIGHT,
			short: 'h',
			type: 'string'
		},
		/**
		 * Input directory path. Defaults to `INPUT_FOLDER` env var.
		 */
		input: {
			default: Bun.env.INPUT_FOLDER,
			short: 'i',
			type: 'string'
		},
		/**
		 * Concurrent processing limit. Defaults to `LIMIT` env var.
		 */
		limit: {
			default: Bun.env.LIMIT,
			short: 'l',
			type: 'string'
		},
		/**
		 * Output directory path. Defaults to `OUTPUT_FOLDER` env var.
		 */
		output: {
			default: Bun.env.OUTPUT_FOLDER,
			short: 'o',
			type: 'string'
		},
		/**
		 * Shortcut to set both width and height to the same value.
		 */
		size: {
			short: 's',
			type: 'string'
		},
		/**
		 * Target width. Defaults to `WIDTH` env var.
		 */
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

/**
 * The consolidated CLI configuration object.
 * Contains resolved paths, dimensions, and processing limits.
 */
export const cli = { format, height, input, limit, output, width }
