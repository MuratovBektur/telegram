import { wssHooks } from "./lib/index.js";
import app from "./http-server.js";
import { createServer } from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
const { wss, pathToHooks } = wssHooks;
const __dirname = dirname(fileURLToPath(import.meta.url));
async function startServer() {
    try {
        const server = createServer();
        const PORT = Number(process.env.PORT) || 4000;
        wss({
            server,
        });
        server.on("request", app);
        pathToHooks(__dirname, "ws-hooks");
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
