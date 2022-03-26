export function checkToken(token: string) {
  if (!token.startsWith("t")) {
    return null;
  }
  console.log(1);
  return token.slice(1);
}
