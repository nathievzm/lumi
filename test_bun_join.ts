import { join, resolve } from 'node:path'

console.log("join1:", join('/base', 'test\0/../bar'))
console.log("resolve1:", resolve('/base', 'test\0/../bar'))
