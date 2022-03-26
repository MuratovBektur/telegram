// import { stringify } from 'querystring';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import WebSocket, { WebSocketServer } from "ws";
import { isJsonString, requireModelMethods } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (arr: Array<string>) => {
  console.log("arr", arr);
  return path.join(...arr);
};

const isObject = (obj: any) => {
  return obj && typeof obj === "object" && !Array.isArray(obj);
};

const sendError = (ws: WebSocket) => {
  return ws.send(
    JSON.stringify({
      event: "error",
      data: "Invalid data",
    })
  );
};

const isValidBody = (body: any) => {
  console.log("!isJsonString(body)", !isJsonString(body));
  if (!isJsonString(body)) return false;
  const data = JSON.parse(body);
  console.log("!isObject(data)", !isObject(data));
  console.log("event", "event" in data);
  console.log("data", "data" in data);
  if (!isObject(data) || !("event" in data) || !("data" in data)) return false;
  return true;
};

export function onGetMessage(wss: WebSocketServer, ws: WebSocket, body: any) {
  // if (!isJsonString(body)) {
  //   return ws.se('error', {
  //     data: 'Invalid data'
  //   })
  // }
  if (!isValidBody(body)) {
    return ws.send(
      JSON.stringify({
        event: "error",
        data: "Invalid data",
      })
    );
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

  if (data === 1) return;

  console.log("data", data);
  console.log("received: %s", data);
}
