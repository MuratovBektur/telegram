import { wssHooks } from "../lib/index.js";

const { hook } = wssHooks;

hook("echo", ({ ws, data }: { ws: any; data: any }) => {
  console.log("data2", data);
  ws.post(data);
});
