import { exists, mkdir } from 'node:fs/promises'
import { resolve, sep } from 'node:path'
import { cwd } from 'node:process'

import { log } from '@clack/prompts'
import color from 'picocolors'

import { FolderError } from './error'

/**
 * Resolves the input directory path.
 *
 * If a path is provided via CLI arguments, it resolves to that path and logs the action.
 * Otherwise, it defaults to the current working directory.
 *
 * @param input - An optional input path provided via CLI arguments.
 *
 * @returns The resolved input directory path.
 */
export const getInput = (input?: string) => {
    if (input !== undefined && input !== '') {
        log.info(`input folder provided: ${color.cyan(input)} 📂`)
        return input
    }

    const currentFolder = cwd()
    log.info(`using current folder as input: ${color.cyan(currentFolder)} 📂`)

    return currentFolder
}

/**
 * Resolves the output directory path.
 *
 * If a path is provided via CLI arguments, it resolves to that path and logs the action.
 * Otherwise, it defaults to an 'output' directory in the current working directory.
 *
 * @param output - An optional output path provided via CLI arguments.
 *
 * @returns The resolved output directory path.
 */
export const getOutput = (output?: string) => {
    if (output !== undefined && output !== '') {
        log.info(`output folder provided: ${color.cyan(output)} 📂`)
        return output
    }

    const defaultOutput = resolve('output')
    log.info(`using default output folder: ${color.cyan(defaultOutput)} 📂`)

    return defaultOutput
}

/**
 * Ensures that the specified output directory exists.
 *
 * If the directory does not exist, it is created recursively.
 * A confirmation message is logged once the directory is ready.
 *
 * @param output - The absolute or relative path to the output directory.
 *
 * @returns A promise that resolves when the directory is verified or successfully created.
 */
export const prepare = async (output: string) => {
    const outputExists = await exists(output)

    if (!outputExists) {
        await mkdir(output, { recursive: true })
    }

    log.info(`output folder ready: ${color.cyan(output)} ✅`, { spacing: 0 })
}

/**
 * Guards against path traversal attacks by ensuring a target path is strictly within a specified base folder.
 *
 * @param folder - The base directory path that the target path must reside within.
 * @param path - The target path to verify.
 *
 * @returns `true` if the target path is securely contained within the base folder.
 * @throws { FolderError } If the target path resolves outside the base folder, indicating a potential path traversal
 *   attempt.
 */
export const guard = (folder: string, path: string) => {
    const resolved = resolve(folder)
    const resolvedPath = resolve(path)
    const normalized = resolved.endsWith(sep) ? resolved : resolved + sep

    if (!resolvedPath.startsWith(normalized)) {
        throw new FolderError('path traversal detected 🚫')
    }

    return true
}
