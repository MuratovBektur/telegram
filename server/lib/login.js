export function login (token) {
  if (typeof token !== 'string' || !token.startsWith('t')) {
    return null
  }
  return token.slice(1)
}