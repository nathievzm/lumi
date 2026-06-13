import { LumiError } from './error'

/**
 * Error thrown when an issue occurs with video processing operations.
 */
export class VideoError extends LumiError {
    /**
     * Creates a new `VideoError` instance.
     *
     * @param message - The error message.
     * @param error - The underlying error or cause.
     */
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'VideoError'
    }
}
