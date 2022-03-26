import fs from "fs";
const fetch = async (path) => await import(path);
const fileNameWithoutExtension = (fileName) => fileName.split(".")[0];
function transformData(event, data) {
    return JSON.stringify({
        event,
        data,
    });
}
export function requireModelMethods({ pathToDir, wss, ws, data, event, }) {
    console.log(pathToDir);
    fs.readdirSync(pathToDir).forEach(async function (file) {
        if (event === fileNameWithoutExtension(file)) {
            let fn = await fetch(pathToDir + "/" + file);
            fn = fn.default;
            let result = fn(wss, ws, data);
            ws.send(transformData(event, result));
        }
    });
}
