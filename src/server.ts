import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

import { setupSocketHandlers } from '@/ws/handler';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    await handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: dev ? '*' : process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  setupSocketHandlers(io);

  const PORT = parseInt(process.env.PORT || '3000', 10);
  httpServer.listen(PORT, () => {
    console.info(`> Ready on http://localhost:${PORT}`);
    console.info(`> Socket.IO server is running on ws://localhost:${PORT}`);
  });
});
