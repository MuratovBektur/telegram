import { EventEmitter, fnType } from "./event-emiiter";
import WebSocketClient, { IWebSocketClient } from "./websocket-client";

export interface IApi {
  eventHandlers: Map<string, [fnType]>;
  socket: any;
}

class Api extends EventEmitter implements IApi {
  socket;

  constructor(url: string, protocols?: string | string[]) {
    super();

    this.socket = new WebSocketClient(url, {
      debug: true,
      protocols: protocols,
      reconnectInterval: 5000,
      pingInterval: 5000,
    });
    this.socket.addEventListener("close", (e) => {
      console.log("yehoo", e);
    });
    this.socket.addEventListener("message", (e) => {
      console.log("message", e.data);
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        this.emit(message.event, message.data);
      }
    });
    setInterval(() => {
      console.log("this.socket", this.socket);
    }, 11000);
  }

  subscribe(eventName: string, cb: fnType) {
    this.addEventListener(eventName, cb);
  }

  unsubscribe(eventName: string, cb: fnType) {
    this.removeEventListener(eventName, cb);
  }

  send(eventName: string, data?: any): void {
    const message = [eventName]
    if (data) message.push(data)
    //   event: eventName,
    //   data,
    // };
    this.socket.send(message);
  }
}

export default new Api("ws://localhost:8000/api");
