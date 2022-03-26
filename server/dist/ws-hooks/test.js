import { hook } from "../lib/wss-hooks.js";
hook("test", ({ ws, data }) => {
    if (!isNaN(data))
        data *= 2;
    ws.post("test", data);
});
