/**
 * Safely extracts a human-readable error message from an unknown error.
 *
 * Designed for use in catch blocks where the error type is unknown,
 * ensuring a consistent string output for logging or user feedback.
 *
 * @param error - The caught error to process.
 *
 * @returns The error message string, or a fallback message if the type is unrecognized.
 */
export const getMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message
    }

    if (typeof error === 'string') {
        return error
    }

    return 'an unknown error occurred'
}
