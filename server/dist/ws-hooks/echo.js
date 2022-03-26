import { hook } from "../lib/wss-hooks.js";
hook('echo', ({ ws, data }) => {
    console.log('data2', data);
    ws.post(data);
});
