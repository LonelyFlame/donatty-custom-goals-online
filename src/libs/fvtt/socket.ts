export const init = (host: string, session: string): WebSocket => {
  return new WebSocket(`ws://${host}:30000/socket.io/?session=${session}&EIO=4&transport=websocket`);
};
