/* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />
import fs from "fs";
import path from "path";
export async function pathToHooks(options) {
    const { dirname, nameFolder, socket, io } = options;
    const normalizedFolder = path.join(dirname, nameFolder);
    const fileNames = await fs.readdirSync(normalizedFolder);
    await Promise.all(fileNames.map(async (fileName) => {
        const file = await import(normalizedFolder + "/" + fileName);
        const hook = file.default;
        hook({
            socket,
            io,
        });
    }));
}
