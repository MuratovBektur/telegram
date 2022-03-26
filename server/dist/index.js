// import { wss, pathToHooks } from "./lib/wss-hooks";
import { wss, pathToHooks } from "./lib/wss-hooks.js";
import app from "./http-server.js";
import { createServer } from "http";
// import { onGetMessage, wssHooks: { wss, pathToHooks } } from "./lib/index.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
async function startServer() {
    try {
        const server = createServer();
        const PORT = Number(process.env.PORT) || 4000;
        const WebSocketServer = wss({
            server
        });
        server.on("request", app);
        // WebSocketServer.on("connection", function connection(ws: any) {
        //   ws.on("message", function message(data: any) {
        //     console.log(data.toString());
        //     // ws.send(data)
        //     // onGetMessage(wss, ws, data)
        //   });
        //   // setInterval(() => {
        //   //   ws.send(JSON.stringify({
        //   //     event: 'getUserList',
        //   //     data: ['1', '2']
        //   //   }))
        //   // }, 3000)
        // });
        pathToHooks(__dirname, 'ws-hooks');
        server.listen(PORT, () => console.log("http/ws server listening on", PORT));
    }
    catch (e) {
        // logger.log({
        //   level: 'error',
        //   message: e.toString()
        // });
        console.error(e);
    }
}
startServer();
