/**
 * Base error class for all Lumi-specific errors.
 *
 * Extends the built-in `Error` class and allows for an optional underlying cause.
 */
export class LumiError extends Error {
    /**
     * Creates a new `LumiError` instance.
     *
     * @param message - The error message.
     * @param error - The underlying error or cause.
     */
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'LumiError'
    }

    /**
     * Extracts a human-readable message from an unknown error object.
     *
     * @param error - The error to extract the message from.
     *
     * @returns The error message, or a generic string if the type is unknown.
     */
    static getMessage(error: unknown) {
        if (error instanceof Error) {
            if (error.cause instanceof Error) {
                return `${error.message} - ${error.cause.message}`
            }

            if (typeof error.cause === 'string') {
                return `${error.message} - ${error.cause}`
            }

            return error.message
        }

        if (typeof error === 'string') {
            return error
        }

        return 'an unknown error occurred'
    }
}

/**
 * Error thrown when an issue occurs with folder operations.
 */
export class FolderError extends LumiError {
    /**
     * Creates a new `FolderError` instance.
     *
     * @param message - The error message.
     * @param error - The underlying error or cause.
     */
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'FolderError'
    }
}

/**
 * Error thrown when an issue occurs with image processing operations.
 */
export class ImageError extends LumiError {
    /**
     * Creates a new `ImageError` instance.
     *
     * @param message - The error message.
     * @param error - The underlying error or cause.
     */
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'ImageError'
    }
}
