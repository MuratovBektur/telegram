export function checkToken (token) {
  if (typeof token !== 'string' || !token.startsWith('t')) {
    return null
  }
  return token.slice(1)
}