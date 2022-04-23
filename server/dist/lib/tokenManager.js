import jwt from "jsonwebtoken";
import util from "util";
const sign = util.promisify(jwt.sign);
const verify = (token, key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, result) => {
            if (err)
                reject(err);
            if (typeof result === "string") {
                resolve(result);
            }
            reject("token must be string");
        });
    });
};
const TOKEN_SECRET = process.env.TOKEN_SECRET;
class TokenManager {
    async generateAccessToken(username) {
        try {
            if (!TOKEN_SECRET)
                throw "token secret not found";
            const token = await sign(username, TOKEN_SECRET);
            return token;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async verifyAccessToken(token) {
        try {
            if (!TOKEN_SECRET)
                throw "token secret not found";
            const phoneNumber = await verify(token, TOKEN_SECRET);
            if (typeof phoneNumber === "string") {
                return phoneNumber;
            }
            throw "token must be string";
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
}
export const tokenManager = new TokenManager();
