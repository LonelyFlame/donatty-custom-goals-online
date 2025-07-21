import { useEffect, useCallback, useRef } from 'react';

import FVTTSocket from '../FVTTSocket';
import type { FVTTSocketCallbacks } from '../types';

const useFVTTSocket = (host: string, session: string, callbacks?: FVTTSocketCallbacks): WebSocket | null => {
  const socketRef = useRef<WebSocket | null>(null);

  const initSocket = useCallback(() => {
    const socket = FVTTSocket(host, session, callbacks);
    socket.onerror = (error) => {
      console.error(`[FVTT:] Socket error:`, error);

      window.setTimeout(() => {
        socket?.close();

        console.error(`[FVTT:] Reconection...`);

        initSocket();
      }, 5000);
    }

    socketRef.current = socket;
  }, [host, session, callbacks]);

  useEffect(() => {
    initSocket();

    return () => {
      socketRef.current?.close();

      socketRef.current = null;
    }
  }, [initSocket, callbacks, host, session]);

  return socketRef.current;
};

export default useFVTTSocket;
