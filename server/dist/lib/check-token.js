export function checkToken(token) {
    if (!token.startsWith("t")) {
        return null;
    }
    console.log(1);
    return token.slice(1);
}
