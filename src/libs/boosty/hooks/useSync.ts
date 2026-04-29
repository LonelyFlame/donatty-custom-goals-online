import { useState, useEffect, useRef } from 'react';

import { SYNC_DELAY } from '../constants';

export function useSync<T>(
  sync: () => Promise<T>,
  initialValue: T,
): T {
  const timeoutRef = useRef<number|undefined>(undefined);

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const clearTimeout = () => {
      window.clearTimeout(timeoutRef.current);

      timeoutRef.current = undefined;
    };
    const startSync = async () => {
      const newValue = await sync();

      setValue(newValue);
    };

    const initSync = () => {
      startSync();

      clearTimeout();

      timeoutRef.current = window.setTimeout(() => {
        initSync();
      }, SYNC_DELAY);
    };

    initSync();

    return clearTimeout
  }, [sync]);

  return value;
}
