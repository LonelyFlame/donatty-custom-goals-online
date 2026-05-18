import { useState, useEffect, useRef } from 'react';

import { SYNC_DELAY } from '../constants';

function useSync<T>(
  syncCallback: () => Promise<T>,
  initialValue: T,
): T {
  const timeoutRef = useRef<number|undefined>(undefined);
  const callbackRef = useRef<() => Promise<T>>(syncCallback);

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    callbackRef.current = syncCallback;
  }, [syncCallback]);

  useEffect(() => {
    const clearTimeout = () => {
      window.clearTimeout(timeoutRef.current);

      timeoutRef.current = undefined;
    };

    const startSync = async () => {
      if (!callbackRef.current) {
        return;
      }

      const newValue = await callbackRef.current();

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
  }, []);

  return value;
}

export default useSync;
