import express from "express";
import geoip from "geoip-lite";
import countryList from "./country-list.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
    return res.json({ message: "Hello World" });
});
app.get("/api/check-number", (req, res) => {
    return res.json(countryList);
});
app.get("/api/get-countries", (req, res) => {
    return res.json(countryList);
});
app.get("/api/get-geo", (req, res) => {
    let geo = null;
    const ip = req.headers["x-real-ip"];
    if (typeof ip === "string") {
        geo = geoip.lookup(ip);
    }
    if (process.env.NODE_ENV === "production") {
        const ip = req.headers["x-real-ip"];
        if (typeof ip === "string") {
            geo = geoip.lookup(ip);
        }
    }
    else {
        if (Math.random() > 0.5) {
            geo = {
                country: "US",
            };
        }
    }
    const result = geo && geo.country;
    return res.json(result);
});
export default app;
