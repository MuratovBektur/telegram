import "../globals.d.ts";
import { EventEmitter } from "./event-emitter";

interface IOptions {
  protocols?: string | string[];
  reconnectInterval?: false | number;
  debug?: boolean;
  pingInterval?: false | number;
}

export interface IWebSocketClient {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  addEventListener: (eventName: string, cb: (...args: any[]) => void) => void | null;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  removeEventListener: (eventName: string, cb: (...args: any[]) => void) => void;
  send: (data: any) => void;
}
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
export function isObject(variable: any): boolean {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

export default class WebSocketClient
  extends EventEmitter
  implements IWebSocketClient
{
  private options: IOptions = {
    protocols: undefined,
    reconnectInterval: false,
    debug: false,
    pingInterval: 5000,
  };

  private socket: WebSocket;
  private url: string;

  constructor(url: string, options?: string | string[] | IOptions) {
    super();
    if (typeof options === "string" || Array.isArray(options)) {
      const protocols = options;
      this.options.protocols = protocols;
    } else if (isObject(options)) {
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

    this.socket.onerror = (e: Event) => {
      if (this.options.debug) {
        console.log("[WS]: errorEvent", e);
      }
    };

    this.socket.onclose = (e: CloseEvent) => {
      if (this.options.debug) {
        console.log("[WS]: closeEvent", e);
        if (e.wasClean) {
          console.log("[WS]: Closed clear");
          return;
        }
      }
      this.reconnect();
    };
    this.releaseEventListener();
    this.checkPing();
  }

  private checkPing(): void {
    if (this.options.pingInterval) {
      setInterval(() => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.send({
            event: "ping",
            data: null,
          });
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

  addEventListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): void {
    super.addEventListener(eventName, listener);
    this.socket.addEventListener(eventName, listener);
  }

  removeEventListener(
    eventName: string,
    listener: (...args: any[]) => void
  ): void {
    super.removeEventListener(eventName, listener);
    this.socket.removeEventListener(eventName, listener);
  }

  public send(data: string | PlainObjectType | Array<any>): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      if (Array.isArray(data) || isObject(data)) {
        data = JSON.stringify(data);
      }
      if (typeof data === 'string') {
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
