import jwt from "jsonwebtoken";
import util from "util";
const sign = util.promisify(jwt.sign);
const verify = (token, key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, result) => {
            if (err)
                reject(err);
            if (typeof result === 'string') {
                resolve(result);
            }
            reject('token must be string');
        });
    });
};
const TOKEN_SECRET = "61609db09b43e0905aedb2e9ac4af939ad1a11ecaa000f2fa752ff44ccff313231480907a7f0daf0b82d63dc02bb6c52b5350ee3eacc3205633d2e79a6130cb8";
class TokenManager {
    async generateAccessToken(username) {
        try {
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
            const phoneNumber = await verify(token, TOKEN_SECRET);
            if (typeof phoneNumber === 'string') {
                return phoneNumber;
            }
            throw 'token must be string';
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
}
export const tokenManager = new TokenManager();
