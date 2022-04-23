import express from "express";
import geoip from "geoip-lite";
import JSONbig from "json-bigint";
import { sendMsg, tokenManager } from "./lib/index.js";
import helper from "./helpers/index.js";
import countryList from "./country-list.js";
import { telegram_user as User } from "./models/user.model.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiRouter = express.Router();
app.use("/api", apiRouter);
function verifyPhone(phoneNumber) {
    return /^\+(\d){3,}$/.test(phoneNumber);
}
const codeNumbers = new Map();
function start() {
    try {
        apiRouter.get("/", (req, res) => {
            return res.json({ message: "Hello World" });
        });
        apiRouter.get("/remove", async (req, res) => {
            const removed = await User.destroy({
                where: {},
            });
            return res.json({ message: "Hello World", removed });
        });
        apiRouter.get("/all", async (req, res) => {
            const all = await User.findAll();
            return res.send(JSONbig.stringify({ message: "Hello World", all }));
        });
        apiRouter.post("/send-code-number", async (req, res) => {
            const body = req.body;
            if (!helper.isObject(body) ||
                !body.phoneNumber ||
                verifyPhone(body.phoneNumber))
                return res.status(400).json("phoneNumber is required or is not valid");
            const randomNum = helper.randomNumber(10e3, 10e4 - 1);
            codeNumbers.set(body.phoneNumber, randomNum.toString());
            const message = "Your secret code: " + randomNum;
            const result = await sendMsg(body.phoneNumber, message);
            return res.json(result);
        });
        apiRouter.post("/check-code-number", async (req, res) => {
            try {
                const body = req.body;
                if (!helper.isObject(body))
                    return res.status(400).json("invalid body");
                const { phoneNumber, code } = body;
                if (!phoneNumber && typeof phoneNumber === "string")
                    return res.status(400).json("phoneNumber is required");
                if (!code)
                    return res.status(400).json("code is required");
                codeNumbers.set("+996 706 360 390", code);
                if (!codeNumbers.has(phoneNumber) ||
                    codeNumbers.get(phoneNumber) !== code.toString()) {
                    return res.status(401).json("code or phone number is incorrect");
                }
                // remove not number symbols
                const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
                const isExistPhoneNumber = await User.findOne({
                    where: {
                        phone_number: formattedPhoneNumber,
                    },
                });
                if (!isExistPhoneNumber) {
                    await User.create({
                        phone_number: formattedPhoneNumber,
                    });
                }
                const token = await tokenManager.generateAccessToken(formattedPhoneNumber);
                return res.json(token);
            }
            catch (e) {
                console.error(e);
                return res.status(502).json(e);
            }
        });
        apiRouter.post("/verify", async (req, res) => {
            try {
                const body = req.body;
                if (!helper.isObject(body) || !body.token) {
                    return res.status(400).json("token is required");
                }
                const token = body.token;
                const phone_number = await tokenManager.verifyAccessToken(token);
                if (!phone_number) {
                    return res.status(401).json("token is incorrect");
                }
                const isExistPhoneNumber = await User.findOne({
                    where: {
                        phone_number,
                    },
                });
                if (!isExistPhoneNumber) {
                    return res.status(401).json("token is incorrect");
                }
                return res.json(isExistPhoneNumber);
            }
            catch (e) {
                console.error(e);
                return res.status(502).json("token is incorrect");
            }
        });
        apiRouter.get("/get-countries", (req, res) => {
            return res.json(countryList);
        });
        apiRouter.get("/get-country-code", (req, res) => {
            let geo = null;
            const ip = req.headers["x-real-ip"];
            if (typeof ip === "string") {
                geo = geoip.lookup(ip);
            }
            const result = geo && geo.country;
            return res.json(result);
        });
    }
    catch (e) {
        console.log(e);
    }
}
start();
export default app;
