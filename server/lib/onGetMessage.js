import {  isJsonString, login } from './index.js';

// const clients = []
const userList = {}

function getTokenBySockedt (wss) {
  ws
}

export function onGetMessage (wss, ws, data) {
  if (!isJsonString(data)) {
    return ws.send(JSON.stringify({
      error: 'Invalid data'
    }));
  }
  data = JSON.parse(data);

  switch (data.type) {
    case 'login':
      const token = login(data.token);
      if (!token) {
        return ws.send(JSON.stringify({
          error: 'Invalid token'
        }));
      }
      ws.token = token
      // clients.push(ws)
      // console.log(clients);
      console.log(wss.clients);
      break;
    case 'addUser':
      console.log('ws.token', ws.token);
      if (userList[data.user]) {
        userList[ws.token].push(data.user)
      } else {
        userList[ws.token] = [data.user]
      }
      console.log(userList)
      break;
    case 'getUserList':
      ws.send(JSON.stringify({
        type: 'userList',
        userList: userList[ws.token]
      }))
      console.log('ws.token', ws.token);
      break;
  }
  console.log('received: %s', data);
}