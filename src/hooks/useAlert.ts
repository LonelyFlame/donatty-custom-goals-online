import { useCallback } from 'react';

import { useAlert as useDAlert } from '@/libs/dontatty/hooks';
import type { TOnData as TDOnData } from '@/libs/dontatty/hooks/useAlert';
import type { TDCurrency } from '@/libs/dontatty/types/alert';

import type { TOnData } from '@/types/hooks';

const ALERTS_CURRENCY = process.env.NEXT_PUBLIC_ALERTS_CURRENCY
  ? String(process.env.NEXT_PUBLIC_ALERTS_CURRENCY).split(',') as TDCurrency[]
  : undefined;

const useAlert = (
  alertLink: string,
  onData: TOnData,
  goals?: string[],
) => {
  const handleData = useCallback<TDOnData>((data) => {
    const { amount, currency, goal } = data;

    if (!amount) return;
    if (!currency) return;
    const acceptedCurrency = !ALERTS_CURRENCY?.length || ALERTS_CURRENCY.includes(currency);
    if (!acceptedCurrency) return;

    const acceptedGoal = !goals?.length || goals.includes(goal || '');
    if (!acceptedGoal) return;

    onData(data);
  }, [onData, goals]);

  useDAlert(alertLink, handleData);
}

export default useAlert;
