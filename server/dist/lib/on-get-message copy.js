// import { stringify } from 'querystring';
import { isJsonString, requireModelMethods } from './index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userList = {};
const getPath = (arr) => {
    console.log('arr', arr);
    return path.join(...arr);
};
export function onGetMessage(wss, ws, body) {
    // export function onGetMessage () {
    // const pathT = getPath([__dirname, '..', 'ws-hooks'])
    // console.log(path);
    // return
    if (!isJsonString(body)) {
        return ws.post('error', {
            error: 'Invalid data'
        });
        // return ws.send(JSON.stringify({
        //   error: 'Invalid data'
        // }))
    }
    body = JSON.parse(body);
    const event = body.event;
    const data = body.data;
    console.log('dirname', __dirname);
    const pathToDir = getPath([__dirname, '..', 'ws-hooks']);
    console.log('path', pathToDir);
    requireModelMethods({
        pathToDir,
        wss,
        ws,
        data,
        event
    });
    if (data === 1)
        return;
    console.log('data', data);
    // fs
    //   .readdirSync('/../ws-hooks')
    // switch (data.event) {
    //   case 'login':
    //     const token = checkToken(data.token);
    //     console.log('token', token)
    //     if (!token) {
    //       return ws.post({
    //         type: 'login',
    //         status: 0,
    //         error: 'Invalid token'
    //       })
    //       // return ws.send(JSON.stringify());
    //     }
    //     ws.token = token
    //     return ws.post({
    //       type: 'login',
    //       status: 1
    //     })
    //     break;
    //   case 'addUser':
    //     console.log('ws.token', ws.token);
    //     if (userList[ws.token]) {
    //       userList[ws.token].push(data.user)
    //     } else {
    //       userList[ws.token] = [data.user]
    //     }
    //     console.log('userList', userList)
    //     wss.clients.forEach(function each(client) {
    //       if (client.token === ws.token && client.readyState === WebSocket.OPEN) {
    //         client.post({  
    //           type: 'userList',
    //           userList: userList[ws.token]
    //         })
    //       }
    //     })
    //     break;
    //   case 'getUserList':
    //     ws.post('userList', {
    //       userList: userList[ws.token]
    //     })
    //     console.log('ws.token', ws.token);
    //     break;
    // }
    console.log('received: %s', data);
}
