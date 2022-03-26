import { WebSocketServer } from 'ws';
import Emitter from "events";
import path from 'path';
import fs from 'fs';
console.log('WebSocketServer', WebSocketServer);
const emitter = new Emitter();
function getJSON(str) {
    try {
        let result = JSON.parse(str);
        return result;
    }
    catch (e) {
        return false;
    }
}
const normalizeData = (data) => {
    let result = data.toString();
    let o = getJSON(result);
    return Array.isArray(o) && o.length > 0 && o;
};
const isEmpty = (data) => data === null || data === undefined;
export function wss(options, cb) {
    const socketServer = new WebSocketServer(options, cb);
    socketServer.on("connection", function connection(ws) {
        ws.post = function (event, data) {
            let preparedData = [event];
            if (!isEmpty(data)) {
                preparedData.push(data);
            }
            return ws.send(JSON.stringify(preparedData));
        };
        ws.on("message", function message(data) {
            data = normalizeData(data);
            if (data && typeof data[0] === 'string') {
                emitter.emit(data[0], {
                    data: data[1],
                    wss: socketServer,
                    ws
                });
            }
        });
    });
    return socketServer;
}
export function hook(event, cb) {
    emitter.on(event, cb);
}
export function pathToHooks(dirname, nameFolder) {
    let normalizedFolder = path.join(dirname, nameFolder);
    fs
        .readdirSync(normalizedFolder)
        .forEach(async function (file) {
        await import(normalizedFolder + '/' + file);
    });
}
// export default {
//   wss,
//   hook,
//   pathToHooks
// }
