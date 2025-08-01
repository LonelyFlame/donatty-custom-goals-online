export const init = (host: string, session: string): WebSocket => {
  return new WebSocket(`wss://${host}/socket.io/?session=${session}&EIO=4&transport=websocket`);
};
