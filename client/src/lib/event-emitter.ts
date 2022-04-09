/* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />

export interface IEventEmitter {
  eventHandlers: Map<string, [fnType]>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
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
  /* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
  emit(eventName: string, data: any): void {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    const subscribers = this.eventHandlers.get(eventName) || [];
    subscribers.forEach((fn: fnType) => fn(data));
  }

  on(eventName: string, cb: fnType): void {
    const subscribers = this.eventHandlers.get(eventName) || [];
    this.eventHandlers.set(eventName, [...subscribers, cb]);
  }

  addEventListener(eventName: string, cb: fnType): void {
    this.on(eventName, cb);
  }

  removeEventListener(eventName: string, cb: fnType): void {
    if (!this.eventHandlers.has(eventName))
      console.warn(`Event ${eventName} not found`);
    let subscribers = this.eventHandlers.get(eventName) || [];
    subscribers = subscribers.filter((fn: fnType) => fn !== cb);
    this.eventHandlers.set(eventName, subscribers);
  }

  removeAllEventListener(eventName: string): void {
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
