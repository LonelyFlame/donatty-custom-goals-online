import { useEffect, useCallback, useRef } from 'react';

import FVTTSocket from '../FVTTSocket';
import type { FVTTSocketCallbacks } from '../types';

const useFVTTSocket = (host: string, session: string, callbacks?: FVTTSocketCallbacks): FVTTSocket | null => {
  const socketRef = useRef<FVTTSocket | null>(null);

  const initSocket = useCallback(() => {
    const socket = new FVTTSocket(host, session, callbacks);

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
