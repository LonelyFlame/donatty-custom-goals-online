import { useEffect, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce';

import { useUnmount } from './useUnmount';


type DebounceOptions = {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

type ControlFunctions = {
  cancel: () => void
  flush: () => void
  isPending: () => boolean
}

export type DebouncedState<T extends (..._args: any) => ReturnType<T>> = ((
  ..._args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions

export function useCallbackDebounce<T extends (..._args: any) => ReturnType<T>>(
  func: T,
  delay = 500,
  options?: DebounceOptions,
): DebouncedState<T> {
  const debouncedFunc = useRef<ReturnType<typeof debounce>>(null);

  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel()
    }
  })

  const debounced = useMemo(() => {
    const debouncedFuncInstance = debounce(func, delay, options);

    const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
      return debouncedFuncInstance(...args);
    }

    wrappedFunc.cancel = () => {
      debouncedFuncInstance.cancel();
    }

    wrappedFunc.isPending = () => {
      return !!debouncedFunc.current;
    }

    wrappedFunc.flush = () => {
      return debouncedFuncInstance.flush();
    }

    return wrappedFunc
  }, [func, delay, options]);

  useEffect(() => {
    debouncedFunc.current = debounce(func, delay, options);
  }, [func, delay, options]);

  return debounced;
}
