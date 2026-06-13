import { join } from 'node:path'

import { guard } from './folder'
import { VideoError } from './video-error'

interface ConvertToWebmParams {
    readonly height: number
    readonly input: string
    readonly name: string
    readonly output: string
    readonly video: string
    readonly width: number
}

interface FfmpegArgsParams {
    readonly height: number
    readonly inputPath: string
    readonly outputPath: string
    readonly width: number
}

interface WebmPaths {
    readonly inputPath: string
    readonly outputPath: string
}

const webmExtension = '.webm'

const videoFormats = [
    '.3g2',
    '.3gp',
    '.avi',
    '.flv',
    '.m2ts',
    '.m4v',
    '.mkv',
    '.mov',
    '.mp4',
    '.mpeg',
    '.mpg',
    '.mts',
    '.ogv',
    '.ts',
    '.webm',
    '.wmv'
] as const

const videoExtensions = new Set<string>(videoFormats)

const getExtension = (extension: string) => extension.toLowerCase()

const summarizeStderr = (stderr: string) => {
    const lines = stderr
        .trim()
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)

    return lines.slice(-8).join('\n')
}

const isMissingCommand = (error: unknown) =>
    typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'

const getFfmpegFailure = (code: number | null, stderr: string) => {
    const details = summarizeStderr(stderr)
    const suffix = details ? `\n${details}` : ''

    return new VideoError(`ffmpeg exited with code ${String(code)}${suffix}`)
}

const getFfmpegStartError = (error: unknown) => {
    if (error instanceof VideoError) {
        return error
    }

    if (isMissingCommand(error)) {
        return new VideoError('ffmpeg was not found. please install ffmpeg and try again', error)
    }

    return new VideoError('ffmpeg failed to start', error)
}

const runFfmpeg = async (args: readonly string[]) => {
    try {
        const process = Bun.spawn(['ffmpeg', ...args], { stderr: 'pipe', stdout: 'ignore' })
        const stderrPromise = new Response(process.stderr).text()
        const code = await process.exited

        if (code === 0) {
            return
        }

        throw getFfmpegFailure(code, await stderrPromise)
    } catch (error: unknown) {
        throw getFfmpegStartError(error)
    }
}

const getWebmFilter = (width: number, height: number) =>
    [
        `scale=${String(width)}:${String(height)}:force_original_aspect_ratio=decrease:flags=lanczos`,
        `pad=${String(width)}:${String(height)}:(ow-iw)/2:(oh-ih)/2:color=black@0`,
        'setsar=1',
        'format=yuva420p'
    ].join(',')

const getFfmpegArgs = (params: Readonly<FfmpegArgsParams>) => [
    '-y',
    '-i',
    params.inputPath,
    '-map',
    '0:v:0',
    '-map',
    '0:a?',
    '-vf',
    getWebmFilter(params.width, params.height),
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '32',
    '-pix_fmt',
    'yuva420p',
    '-c:a',
    'libopus',
    '-shortest',
    params.outputPath
]

const getWebmPaths = (params: Readonly<ConvertToWebmParams>): WebmPaths => ({
    inputPath: join(params.input, params.video),
    outputPath: join(params.output, `${params.name}${webmExtension}`)
})

const runWebmConversion = async (params: Readonly<ConvertToWebmParams>) => {
    const { inputPath, outputPath } = getWebmPaths(params)

    guard(params.input, inputPath)
    guard(params.output, outputPath)

    await runFfmpeg(getFfmpegArgs({ height: params.height, inputPath, outputPath, width: params.width }))
}

export const getVideoFormats = () => [...videoFormats]

export const isVideoExtension = (extension: string) => videoExtensions.has(getExtension(extension))

export const isWebmTarget = (extension: string) => getExtension(extension) === webmExtension

export const canConvertToWebm = (extension: string) => isVideoExtension(extension) || getExtension(extension) === '.gif'

export const convertToWebm = async (params: Readonly<ConvertToWebmParams>) => {
    const { name, video } = params

    try {
        await runWebmConversion(params)
        return `processed and saved: ${name}${webmExtension} `
    } catch (error: unknown) {
        if (error instanceof VideoError) {
            throw new VideoError(`error processing ${video}: ${error.message}`, error)
        }

        throw new VideoError(`error processing ${video}`, error)
    }
}
