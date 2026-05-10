/**
 * Extracts a human-readable error message from an unknown error type.
 *
 * This utility is used to safely handle errors caught in catch blocks,
 * ensuring that the output is always a string that can be displayed or logged.
 *
 * @param error - The error to extract the message from.
 *
 * @returns The error message if it's an Error instance or a string; otherwise, a default message.
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
