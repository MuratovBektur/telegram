import { hook } from "../lib/wss-hooks.js"

hook('echo',({ ws, data }: {ws:any, data: any}) => {
  console.log('data2', data)
  ws.post(data)
}) 
