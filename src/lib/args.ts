import { parseArgs } from 'node:util'

const { values } = parseArgs({
    allowPositionals: true,
    args: Bun.argv.slice(2),
    options: {
        /**
         * Global output format. Defaults to the `FORMAT` environment variable.
         */
        format: {
            default: Bun.env.FORMAT,
            short: 'f',
            type: 'string'
        },
        /**
         * Target height. Defaults to the `HEIGHT` environment variable.
         */
        height: {
            default: Bun.env.HEIGHT,
            short: 'h',
            type: 'string'
        },
        /**
         * Input directory path. Defaults to the `INPUT_FOLDER` environment variable.
         */
        input: {
            default: Bun.env.INPUT_FOLDER,
            short: 'i',
            type: 'string'
        },
        /**
         * Concurrent processing limit. Defaults to the `LIMIT` environment variable.
         */
        limit: {
            default: Bun.env.LIMIT,
            short: 'l',
            type: 'string'
        },
        /**
         * Output directory path. Defaults to the `OUTPUT_FOLDER` environment variable.
         */
        output: {
            default: Bun.env.OUTPUT_FOLDER,
            short: 'o',
            type: 'string'
        },
        /**
         * Whether to process the input directory recursively. Defaults to the `RECURSIVE` environment variable.
         */
        recursive: {
            default: Bun.env.RECURSIVE === 'true',
            short: 'r',
            type: 'boolean'
        },
        /**
         * Shortcut to set both width and height to the same value.
         */
        size: {
            short: 's',
            type: 'string'
        },
        /**
         * Target width. Defaults to the `WIDTH` environment variable.
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
const { input, output, format, recursive } = values

/**
 * The consolidated CLI configuration object.
 *
 * Contains resolved paths, dimensions, and processing limits.
 */
export const cli = { format, height, input, limit, output, recursive, width }
