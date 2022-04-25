import jwt from "jsonwebtoken";

const sign = (body: object, key: jwt.Secret, options: jwt.SignOptions) => {
  return new Promise((resolve, reject) => {
    jwt.sign(body, key, options, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const verify = (token: string, key: jwt.Secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, result) => {
      if (err) reject(err);
      if (result && typeof result === 'object' && result.phoneNumber) {
        resolve(result.phoneNumber);
      }
      reject(new Error("token is incorrect"));
    });
  });
};

const TOKEN_SECRET = process.env.TOKEN_SECRET;

class TokenManager {
  async generateAccessToken(phoneNumber: string) {
    try {
      if (!TOKEN_SECRET) throw "token secret not found";
      const token = await sign({ phoneNumber }, TOKEN_SECRET, {
        expiresIn: "7d"
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async verifyAccessToken(token: string) {
    try {
      if (!TOKEN_SECRET) throw "token secret not found";
      const body = await verify(token, TOKEN_SECRET);
      return body
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export const tokenManager = new TokenManager();
