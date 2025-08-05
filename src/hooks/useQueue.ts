'use client';

import { useEffect, useState, useRef } from 'react';

interface Props<T> {
  queue: T[];
  moveFurther: () => void;
  delay: number;
  moveQueueFurtherDelay?: number;
}

export const DEFAULT_MOVE_QUEUE_FURTHER_DELAY = 0.4;

const useQueue = <T>({
  queue,
  moveFurther,
  delay,
  moveQueueFurtherDelay = DEFAULT_MOVE_QUEUE_FURTHER_DELAY,
}: Props<T>): { visible: boolean; item?: T } => {
  const timeoutRef = useRef<number | null>(null);

  const [visible, setVisible] = useState(false);

  const item = queue.at(0);

  const queueLength = queue.length;
  useEffect(() => {
    if (timeoutRef.current || queueLength === 0) {
      return;
    }

    setVisible(true);

    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;

        moveFurther();
      }, moveQueueFurtherDelay * 1000);
    }, delay * 1000);
  }, [moveQueueFurtherDelay, queueLength, delay, moveFurther]);

  return { visible, item };
};

export default useQueue;
