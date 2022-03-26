import { WebSocketServer } from 'ws'
import Emitter from "events"
import path from 'path'
import fs from 'fs'

console.log('WebSocketServer', WebSocketServer);

const emitter = new Emitter()
type WebSocketServerCb = (...args: any[]) => any
type WebSocketServerOptions = {
  [key: string]: any
}

function getJSON(str: any): Array <any> | Object| false {
  try {
    let result = JSON.parse(str)
    return result
  } catch (e) {
    return false
  }
}

const normalizeData = (data: BinaryData): Array <any> | false => {
  let result: any = data.toString()
  let o: Array <any> | Object| false = getJSON(result)

  return Array.isArray(o) && o.length > 0 && o
}

const isEmpty = (data: any):boolean => data === null || data === undefined

export function wss(options: WebSocketServerOptions, cb?: WebSocketServerCb) {
  const socketServer = new WebSocketServer(options, cb)
  socketServer.on("connection", function connection(ws: any) {
    ws.post = function (event: string, data: any) {
      let preparedData = [event]
      if (!isEmpty(data)) {
        preparedData.push(data)
      }
      return ws.send(JSON.stringify(preparedData))
    }
    ws.on("message", function message(data: any) {
      data = normalizeData(data)
      if (data && typeof data[0] === 'string') {
        emitter.emit(data[0], {
          data: data[1],
          wss: socketServer,
          ws
        })
      }
    })
  })
  return socketServer
}

export function hook (event: string, cb: (data: any) => any) {
  emitter.on(event, cb)
}

export function pathToHooks (dirname: 'string', nameFolder: 'string') {
  let normalizedFolder = path.join(dirname, nameFolder)

  fs
    .readdirSync(normalizedFolder)
    .forEach(async function (file: string) {
      await import(normalizedFolder + '/' + file)
    })
}

// export default {
//   wss,
//   hook,
//   pathToHooks
// }