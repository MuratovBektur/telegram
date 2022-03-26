import WebSocket, { WebSocketServer } from "ws";

interface IWebSocket extends WebSocket {
  [key: string]: any;
}

function heartbeat(ws: IWebSocket) {
  ws.isAlive = true;
}

export function checkIsAliveWS(wss: WebSocketServer, ws: IWebSocket) {
  ws.isAlive = true;
  ws.on("pong", () => {
    heartbeat(ws);
  });
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws: IWebSocket) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 3000);

  wss.on("close", function close() {
    clearInterval(interval);
  });
}
