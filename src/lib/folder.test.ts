import { describe, expect, it } from 'bun:test'

import { FolderError } from './error'
import { guard } from './folder'

describe('folder', () => {
    describe('guard', () => {
        it('throws an error if the path contains a null byte', () => {
            expect(() => guard('/safe/folder', '/safe/folder/file.png\0')).toThrow(FolderError)
        })

        it('throws an error if the folder contains a null byte', () => {
            expect(() => guard('/safe/folder\0', '/safe/folder/file.png')).toThrow(FolderError)
        })

        it('throws an error if the path is outside the folder', () => {
            expect(() => guard('/safe/folder', '/safe/other/file.png')).toThrow(FolderError)
        })

        it('returns true for a valid path inside the folder', () => {
            expect(guard('/safe/folder', '/safe/folder/file.png')).toBe(true)
        })
    })
})
