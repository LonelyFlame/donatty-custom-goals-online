import type { Server, Socket } from 'socket.io';

import { boostySocketService } from './boosty/SocketService';
import type { TType } from './boosty/types';

interface TBoostySubscribeData {
  slug: string;
  levelIds: number[];
  type: TType;
}

export function setupSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('boosty:subscribe', (data: TBoostySubscribeData) => {

      boostySocketService.addClient(socket, data);
    });

    socket.on('boosty:unsubscribe', () => {
      boostySocketService.removeClient(socket);
    });

    socket.on('disconnect', () => {
      boostySocketService.removeClient(socket);
    });
  });
}
