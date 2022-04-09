/* eslint-disable  @typescript-eslint/triple-slash-reference */
/// <reference path="../globals.d.ts" />
export default function hook({ socket, io }) {
    socket.on('test', (data) => {
        console.log(data);
    });
}
