import { Socket } from "socket.io";

interface IHook {
  socket: Socket,
  io: SocketIO.Server,
}
type pathToHooksType = {
  dirname: string, 
  nameFolder: string, 
  socket: Socket,
  io: SocketIO.Server,
}
declare type hook = (options: IHook) => void

declare type pathToHooks = (options: pathToHooksType) => void

/* eslint-disable  @typescript-eslint/no-explicit-any */
declare type fnType = (...args: any[]) => any;