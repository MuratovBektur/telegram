import express from "express";
import geoip from "geoip-lite";

import { sendMsg } from "./lib/index.js";
import helper from "./helpers/index.js";

import countryList from "./country-list.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();
app.use("/api", apiRouter);

const codeNumbers = new Map();

function start() {
  try {
    apiRouter.get("/", (req, res) => {
      return res.json({ message: "Hello World" });
    });
    apiRouter.post("/send-code-number", async (req, res) => {
      const body = req.body;
      if (!helper.isObject(body) || !body.phoneNumber)
        return res.status(400).json("phoneNumber is required");
      const randomNum = helper.randomNumber(10e3, 10e4 - 1);
      codeNumbers.set(body.phoneNumber, randomNum.toString());
      const message = "Your secret code: " + randomNum;
      const result = await sendMsg(body.phoneNumber, message);
      return res.json(result);
    });

    apiRouter.post("/check-code-number", async (req, res) => {
      const body = req.body;
      if (!helper.isObject(body)) return res.status(400).json("invalid body");
      const { phoneNumber, code } = body;
      if (!phoneNumber) return res.status(400).json("phoneNumber is required");
      if (!code) return res.status(400).json("code is required");
      if (!codeNumbers.has(phoneNumber))
        return res.status(401).json("code or phone number is incorrect");
      if (codeNumbers.get(phoneNumber) !== code.toString()) return res.status(401).json("code or phone number is incorrect");
      return res.json('ok')
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
  } catch (e) {
    console.log(e);
  }
}

start();

export default app;
