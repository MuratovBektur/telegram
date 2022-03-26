import fs from "fs";
import WebSocket, { WebSocketServer } from "ws";

const fetch = async (path: string) => await import(path);
const fileNameWithoutExtension = (fileName: string) => fileName.split(".")[0];

interface IrequireModelMethods {
  pathToDir: string;
  wss: WebSocketServer;
  ws: WebSocket;
  data: any;
  event: string;
}

function transformData(event: string, data: any) {
  return JSON.stringify({
    event,
    data,
  });
}

export function requireModelMethods({
  pathToDir,
  wss,
  ws,
  data,
  event,
}: IrequireModelMethods) {
  console.log(pathToDir);
  fs.readdirSync(pathToDir).forEach(async function (file) {
    if (event === fileNameWithoutExtension(file)) {
      let fn = await fetch(pathToDir + "/" + file);
      fn = fn.default;
      let result = fn(wss, ws, data);
      ws.send(transformData(event, result));
    }
  });
}
