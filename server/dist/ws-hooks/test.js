import { wssHooks } from "../lib/index.js";
const { hook } = wssHooks;
hook("test", ({ ws, data }) => {
    if (!isNaN(data))
        data *= 2;
    ws.post("test", data);
});
