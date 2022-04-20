import { Server as SocketServer } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { pathToHooks, tokenManager } from "./lib/index.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default function socketServer(httpServer) {
    try {
        const io = new SocketServer(httpServer, {
            path: '/ws',
            pingInterval: 3000,
        });
        io.use(async (socket, next) => {
            try {
                const token = socket.handshake.query && socket.handshake.query.token;
                if (token && typeof token === 'string') {
                    const phoneNumber = await tokenManager.verifyAccessToken(token);
                    if (typeof phoneNumber === 'string') {
                        socket.phoneNumber = phoneNumber;
                        next();
                    }
                    else {
                        next(new Error('Authentication error'));
                    }
                }
                else {
                    next(new Error('Authentication error'));
                }
            }
            catch (e) {
                next(new Error('Authentication error'));
            }
        }).on("connection", async (socket) => {
            await pathToHooks({
                dirname: __dirname,
                nameFolder: "ws-hooks",
                socket,
                io
            });
        });
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
