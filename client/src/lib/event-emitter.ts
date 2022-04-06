export type fnType = (...args: any[]) => any;

export interface IEventEmitter {
  eventHandlers: Map<string, [fnType]>;
  emit: (eventName: string, data: any) => void;
  on: (eventName: string, cb: fnType) => void;
  addEventListener: (eventName: string, cb: fnType) => void;
  removeEventListener: (eventName: string, cb: fnType) => void;
  removeAllEventListener: (eventName: string) => void;
  eventNames: () => string[];
  listeners: (eventName: string) => fnType[];
}
export class EventEmitter implements IEventEmitter {
  eventHandlers = new Map();

  emit(eventName: string, data: any) {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    const subscribers = this.eventHandlers.get(eventName) || [];
    subscribers.forEach((fn: fnType) => fn(data));
  }

  on(eventName: string, cb: fnType) {
    const subscribers = this.eventHandlers.get(eventName) || [];
    this.eventHandlers.set(eventName, [...subscribers, cb]);
  }

  addEventListener(eventName: string, cb: fnType) {
    this.on(eventName, cb);
  }

  removeEventListener(eventName: string, cb: fnType) {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    let subscribers = this.eventHandlers.get(eventName) || [];
    subscribers = subscribers.filter((fn: fnType) => fn !== cb);
    this.eventHandlers.set(eventName, subscribers);
  }

  removeAllEventListener(eventName: string) {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    this.eventHandlers.delete(eventName);
  }

  eventNames(): string[] {
    return [...this.eventHandlers.keys()];
  }

  listeners(eventName: string): fnType[] {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    return this.eventHandlers.get(eventName) || [];
  }
}
