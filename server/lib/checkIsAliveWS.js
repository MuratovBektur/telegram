function heartbeat() {
  this.isAlive = true;
}

export function checkIsAliveWS (wss, ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 3000);
  
  wss.on('close', function close() {
    clearInterval(interval);
  });
}