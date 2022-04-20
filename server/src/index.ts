import app from "./http-server.js";
import socketServer from "./socket-server.js";
import { connectToDB } from "./lib/index.js";
import { createServer } from "http";

async function startServer() {
  try {
    await connectToDB()
    const PORT = Number(process.env.PORT) || 4000;
    const httpServer = createServer(app);
    await socketServer(httpServer);
    httpServer.listen(PORT, () => console.log("http/ws server listening on", PORT));
  } catch (e) {
    // logger.log({
    //   level: 'error',
    //   message: e.toString()
    // });
    console.error(e);
  }
}
startServer();
