import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const useBoostyCount = (
  slug: string,
  levelIds: number[],
  initialValue?: number
) => {
  const [count, setCount] = useState<number | null>(initialValue || null);

  const paramsRef = useRef({ slug, levelIds });

  useEffect(() => {
    paramsRef.current = { slug, levelIds };
  }, [slug, levelIds]);

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || undefined, {
        autoConnect: true,
      });
    }

    const handleUpdate = ({ count }: { count: number }) => {
      setCount(count);

      const slug = paramsRef.current.slug;
      if (slug) {
        localStorage.setItem(`${paramsRef.current?.slug}_value`, String(count));
      }
    };

    const handleError = (data: { message: string }) => {
      console.error(data.message);
    };

    socket.on('boosty:count:update', handleUpdate);
    socket.on('error', handleError);

    const timeoutId = setTimeout(() => {
      if (socket?.connected) {
        socket.emit('boosty:subscribe', {
          slug: paramsRef.current.slug,
          type: 'count',
          levelIds,
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      socket?.off('boosty:count:update', handleUpdate);
      socket?.off('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (initialValue) {
      return;
    }

    const cachedValue = Number(localStorage.getItem(`${slug}_value`)) || null;

    setCount(cachedValue);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!slug) {
    return initialValue || 0;
  }

  return count;
};
