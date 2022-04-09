 /* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />
import { EventEmitter } from "./event-emitter";
import WebSocketClient from "./websocket-client";

// export interface IChannel {
//   eventHandlers: Map<string, [fnType]>;
//   socket: IWebSocketClient;
// }

class Channel extends EventEmitter {
  socket;

  constructor(url: string, protocols?: string | string[]) {
    super();

    this.socket = new WebSocketClient(url, {
      debug: true,
      protocols,
      reconnectInterval: 5000,
      pingInterval: 5000,
    });
    this.socket.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        this.emit(message.event, message.data);
      }
    });
  }

  subscribe(eventName: string, cb: fnType) {
    this.socket.addEventListener(eventName, cb);
  }

  unsubscribe(eventName: string, cb: fnType) {
    this.socket.removeEventListener(eventName, cb);
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  send(eventName: string, data?: any): void {
    const message = [eventName]
    if (data) message.push(data);
    this.socket.send(message);
  }
}

export default new Channel("ws://localhost:8000/api");
