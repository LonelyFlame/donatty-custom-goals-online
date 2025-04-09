import { useRef, useEffect } from 'react';

import DAlert from '../DAlert';
import type { TDAlertMessages } from '../types/alert';


export type TOnData = (_data: TDAlertMessages) => void;

const useAlert = (
  widgetLink? : string,
  onData?: TOnData,
) => {
  const ref = useRef<DAlert | null>(null);
  const handleDataRef = useRef<undefined | TOnData>(undefined);

  useEffect(() => {
    if (!widgetLink) return;

    const goal = new DAlert(widgetLink);
    goal.onData = (data) => {
      if (handleDataRef.current) {
        handleDataRef.current(data);
      }
    }
    goal.start();

    ref.current = goal;

    return () => {
      goal.stop();
      ref.current = null;
    };
  }, [widgetLink]);

  useEffect(() => {
    handleDataRef.current = onData;
  }, [onData]);
}

export default useAlert;
