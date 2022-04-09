/* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />
import { EventEmitter } from "./event-emitter";

interface IOptions {
  protocols?: string | string[];
  reconnectInterval?: false | number;
  debug?: boolean;
  pingInterval?: false | number;
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export function isPlainObject(variable: any): boolean {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

export default class WebSocketClient extends EventEmitter {
  private options: IOptions = {
    protocols: undefined,
    reconnectInterval: false,
    debug: false,
    pingInterval: 5000,
  };

  private socket: WebSocket;
  private url: string;
  private isAlive = false;

  constructor(url: string, options?: string | string[] | IOptions) {
    super();
    if (typeof options === "string" || Array.isArray(options)) {
      const protocols = options;
      this.options.protocols = protocols;
    } else if (isPlainObject(options)) {
      this.options = {
        ...this.options,
        ...options,
      };
    }
    this.url = url;
    this.connect(url, this.options.protocols);
  }

  private connect(url: string, protocols?: string | string[]): void {
    this.socket = new WebSocket(url, protocols);

    this.socket.addEventListener("message", (e: MessageEvent) => {
      if (this.options.debug) {
        console.log(`[WS]: Message received: ${e.data}`);
      }
      let message: Array<any> | string;
      try {
        message = JSON.parse(e.data);
        if (Array.isArray(message)) {
          const [event, data] = message;
          this.emit(event, data);
          // check pong message after sending ping message
          if (event === "pong") {
            this.isAlive = true;
          }
        }
      } catch {
        console.error("expected array message");
      }
    });

    this.socket.addEventListener("error", (e: Event) => {
      if (this.options.debug) {
        console.log("[WS]: errorEvent", e);
      }
    });
    this.socket.addEventListener("close", (e: CloseEvent) => {
      if (this.options.debug) {
        console.log("[WS]: closeEvent", e);
        if (e.wasClean) {
          console.log("[WS]: Closed clear");
          return;
        }
      }
      this.reconnect();
    });
    this.releaseEventListener();
    this.checkPing();
  }
  // check pong message after sending ping message
  private checkPong(): void {
    // if no pong message was received within half a second,
    // then we reconnect to the ws server
    this.isAlive = false;
    setTimeout(() => {
      if (this.options.debug) {
        console.warn("[WS]: Pong timeout");
      }
      if (!this.isAlive) {
        this.reconnect()
      }
    }, 500);
  }

  private checkPing(): void {
    if (this.options.pingInterval) {
      setInterval(() => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.checkPong();
          this.send(["ping"]);
        } else {
          if (this.options.debug) {
            console.log(
              `[WS]: Can't send ping readyState: ${this.socket.readyState}`
            );
          }
          this.reconnect();
        }
      }, this.options.pingInterval);
    }
  }

  private releaseEventListener(): void {
    this.eventNames().forEach((eventName) => {
      this.listeners(eventName).forEach((listener) => {
        this.socket.addEventListener(eventName, listener);
      });
    });
  }

  addEventListener(eventName: string, listener: fnType): void {
    super.addEventListener(eventName, listener);
    this.socket.addEventListener(eventName, listener);
  }

  removeEventListener(eventName: string, listener: fnType): void {
    super.removeEventListener(eventName, listener);
    this.socket.removeEventListener(eventName, listener);
  }

  public send(data: string | PlainObjectType | Array<any>): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      if (Array.isArray(data) || isPlainObject(data)) {
        data = JSON.stringify(data);
      }
      if (typeof data === "string") {
        this.socket.send(data);
      }
    } else {
      if (this.options.debug) {
        console.log(
          "[WS]: Can't send message readyState:" + this.socket.readyState
        );
      }
      this.socket.addEventListener(
        "open",
        (e) => {
          console.log("e", e);
          this.send(data);
        },
        { once: true }
      );
    }
  }

  private reconnect(): void {
    if (this.options.reconnectInterval) {
      if (this.options.debug) {
        console.log(
          `[WS]: Reconnecting in ${
            this.options.reconnectInterval / 1000
          } seconds.`
        );
      }
      setTimeout(() => {
        this.connect(this.url, this.options.protocols);
      }, this.options.reconnectInterval);
    }
  }
}
