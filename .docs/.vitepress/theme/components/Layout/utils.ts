export function ensureStartingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}
