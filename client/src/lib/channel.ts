/* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />
import { io, Socket } from "socket.io-client";

class Channel {
  socket: Socket;

  constructor() {
    const socketProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socketUrl = `${socketProtocol}://${window.location.host}`;
    this.socket = io(socketUrl, {
      path: "/ws",
      reconnectionDelayMax: 2000,
    });
    this.socket.emit("test");
  }

  subscribe(event: string, cb: fnType) {
    this.socket.on(event, cb);
  }

  unsubscribe(event: string, cb: fnType) {
    this.socket.off(event, cb);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  send(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export default new Channel();
