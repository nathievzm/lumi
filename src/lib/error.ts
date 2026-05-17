export class LumiError extends Error {
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'LumiError'
    }

    static getMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message
        }

        if (typeof error === 'string') {
            return error
        }

        return 'an unknown error occurred'
    }
}

export class FolderError extends LumiError {
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'FolderError'
    }
}

export class ImageError extends LumiError {
    constructor(message: string, error?: unknown) {
        super(message, { cause: error })
        this.name = 'ImageError'
    }
}
