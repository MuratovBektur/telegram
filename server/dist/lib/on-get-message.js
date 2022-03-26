// import { stringify } from 'querystring';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { isJsonString, requireModelMethods } from "./index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (arr) => {
    console.log("arr", arr);
    return path.join(...arr);
};
const isObject = (obj) => {
    return obj && typeof obj === "object" && !Array.isArray(obj);
};
const sendError = (ws) => {
    return ws.send(JSON.stringify({
        event: "error",
        data: "Invalid data",
    }));
};
const isValidBody = (body) => {
    console.log("!isJsonString(body)", !isJsonString(body));
    if (!isJsonString(body))
        return false;
    const data = JSON.parse(body);
    console.log("!isObject(data)", !isObject(data));
    console.log("event", "event" in data);
    console.log("data", "data" in data);
    if (!isObject(data) || !("event" in data) || !("data" in data))
        return false;
    return true;
};
export function onGetMessage(wss, ws, body) {
    // if (!isJsonString(body)) {
    //   return ws.se('error', {
    //     data: 'Invalid data'
    //   })
    // }
    if (!isValidBody(body)) {
        return ws.send(JSON.stringify({
            event: "error",
            data: "Invalid data",
        }));
    }
    body = JSON.parse(body);
    const event = body.event;
    const data = body.data;
    console.log("dirname", __dirname);
    const pathToDir = getPath([__dirname, "..", "ws-hooks"]);
    console.log("path", pathToDir);
    requireModelMethods({
        pathToDir,
        wss,
        ws,
        data,
        event,
    });
    if (data === 1)
        return;
    console.log("data", data);
    console.log("received: %s", data);
}
