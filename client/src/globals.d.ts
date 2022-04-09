declare type CountryType = {
  name: string;
  flag: string;
  format: string;
  phone?: string;
  phoneCode: string;
  code: string;
  dialCode: string;
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
declare type PlainObjectType = {
  [key: string]: any
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
declare type fnType = (...args: any[]) => any;

declare class WebSocketClient {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  addEventListener: (eventName: string, cb: fnType) => void | null;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  removeEventListener: (eventName: string, cb: fnType) => void;
  send: (data: any) => void;
}
declare class IChannel {
  eventHandlers: Map<string, [fnType]>;
  socket: WebSocketClient;
}