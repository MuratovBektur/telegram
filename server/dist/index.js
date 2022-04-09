import app from "./http-server.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { pathToHooks } from "./lib/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
async function startServer() {
    try {
        const httpServer = createServer(app);
        const PORT = Number(process.env.PORT) || 4000;
        const io = new SocketServer(httpServer, {
            path: '/ws',
            pingInterval: 3000,
        });
        io.on("connection", async (socket) => {
            await pathToHooks({
                dirname: __dirname,
                nameFolder: "ws-hooks",
                socket,
                io
            });
        });
        httpServer.listen(PORT, () => console.log("http/ws server listening on", PORT));
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
