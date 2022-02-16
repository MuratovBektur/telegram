// import express from 'express'
// import { checkIsAliveWS, onGetMessage } from './lib/index.js'

// const app = express();
// import expressWS from 'express-ws'
// const wss = expressWS(app);

// const PORT = process.env.PORT || 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/api', (req, res) => {
//   return res.json({ message: 'Hello World2' });
// })
// app.ws('/api', (ws, res) => {
//   ws.on('message', function(data) {
//     onGetMessage(wss, ws, data)
//   });
//   console.log('socket', req.url);
//   // return res.json({ message: 'Hello World2' });
// })



// app.listen(PORT, () => console.log('http/ws server listening on', PORT));

import { WebSocketServer } from 'ws';
import app from './http-server.js';
import { createServer } from 'http';
import { checkIsAliveWS, onGetMessage } from './lib/index.js'
const server = createServer();
const PORT = process.env.PORT || 4000;

const wss = new WebSocketServer({
  server
});

server.on('request', app);

console.log('in2');

wss.on('connection', function connection(ws) {
  checkIsAliveWS(wss, ws)
  ws.post = function (data, ...args) {
    if (!!data && typeof data === 'object') {
      return ws.send(JSON.stringify(data, ...args));
    }
    return ws.send(data, ...args)
  }
  ws.on('message', function message(data) {
    onGetMessage(wss, ws, data)
  });

  ws.post({
    type: 'connection',
    status: 1
  });
});

server.listen(PORT, () => console.log('http/ws server listening on', PORT));

