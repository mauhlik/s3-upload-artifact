import { resolveRemoteName } from '../src/upload'

describe('resolveRemoteName', () => {
  it('should return the file path when remoteNamePrefix is not provided', () => {
    const filePath = 'path/to/file.txt'
    const result = resolveRemoteName(filePath)
    expect(result).toBe(filePath)
  })

  it('should return the file path with the prefix when remoteNamePrefix is provided', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = 'prefix'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })

  it('should remove leading slashes from the prefix', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = '/prefix'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })

  it('should handle multiple leading slashes in the prefix', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = '///prefix'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })

  it('should handle an empty prefix', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = ''
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('path/to/file.txt')
  })

  it('should handle a prefix with trailing slashes', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = 'prefix/'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })

  it('should handle leading and trailing slashes in the file path', () => {
    const filePath = '/path/to/file.txt'
    const result = resolveRemoteName(filePath)
    expect(result).toBe('path/to/file.txt')
  })

  it('should handle leading and trailing slashes in the prefix', () => {
    const filePath = 'path/to/file.txt'
    const remoteNamePrefix = '/prefix/'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })

  it('should handle leading and trailing slashes in the file path and prefix', () => {
    const filePath = '/path/to/file.txt'
    const remoteNamePrefix = '/prefix/'
    const result = resolveRemoteName(filePath, remoteNamePrefix)
    expect(result).toBe('prefix/path/to/file.txt')
  })
})
