// import { stringify } from 'querystring';
import { isJsonString, checkToken } from './index.js';

// const clients = []
// stringify
const userList = {}

const post = function (ws, data, ...args) {
  if (!data && typeof data === 'object') {
    return ws.send(JSON.stringify(data, ...args));
  }
  return ws.send(data, ...args)
}

export function onGetMessage (wss, ws, data) {
  if (!isJsonString(data)) {
    return ws.send(JSON.stringify({
      error: 'Invalid data'
    }));
  }
  data = JSON.parse(data);

  console.log('data', data)

  switch (data.action) {
    case 'login':
      const token = checkToken(data.token);
      console.log('token', token)
      if (!token) {
        return ws.post({
          type: 'login',
          status: 0,
          error: 'Invalid token'
        })
        // return ws.send(JSON.stringify());
      }
      ws.token = token
      return ws.post({
        type: 'login',
        status: 1
      })
      break;
    case 'addUser':
      console.log('ws.token', ws.token);
      if (userList[ws.token]) {
        userList[ws.token].push(data.user)
      } else {
        userList[ws.token] = [data.user]
      }
      console.log('userList', userList)
      wss.clients.forEach(function each(client) {
        console.log('client', client)
        client.post({  
          type: 'userList',
          userList: userList[ws.token]
        })
      })
      break;
    case 'getUserList':
      ws.post({
        type: 'userList',
        userList: userList[ws.token]
      })
      console.log('ws.token', ws.token);
      break;
  }
  console.log('received: %s', data);
}