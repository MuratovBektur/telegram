const handlers = new Map();

const socket = new WebSocket("ws://localhost:8000/api");

socket.addEventListener("message", (e) => {
  const { type, ...otherPayloads } = JSON.parse(e.data);
  const payloads = Object.values(otherPayloads)
  console.log(handlers.has(type), e.data, payloads);
  if (handlers.has(type)) {
    const subscribers = handlers.get(type) || [];
    console.log(subscribers, payloads);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    subscribers.forEach((fn: (...payloads: any[]) => void) => fn(...payloads));
  }
});

export const sendToWebSocket = (message: unknown): void => {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

export const subscribe = (action: string, cb: (...payloads: any[]) => void ): void => {
  const subscribers = handlers.get(action) || [];
  handlers.set(action, [...subscribers, cb]);
};

export const unsubscribe = (action: string): void => {
  handlers.delete(action);
};
