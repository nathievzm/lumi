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
    // eslint-disable-next-line max-statements
    static getMessage(error: unknown) {
        if (error instanceof Error) {
            let { message } = error
            const { cause } = error

            if (cause instanceof Error && cause.message) {
                message += `: ${cause.message}`
            } else if (typeof cause === 'string' && cause) {
                message += `: ${cause}`
            } else if (typeof cause === 'object' && cause !== null) {
                // eslint-disable-next-line no-unsafe-type-assertion
                const causeObj = cause as Record<string, unknown>

                if (typeof causeObj['message'] === 'string' && causeObj['message']) {
                    message += `: ${causeObj['message']}`
                } else if (causeObj['cause'] instanceof Error && causeObj['cause'].message) {
                    message += `: ${causeObj['cause'].message}`
                }
            }

            return message
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
