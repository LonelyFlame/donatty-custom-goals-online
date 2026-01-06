'use client'

import { useMemo } from 'react';

import { useMultipleGoals } from '@/libs/dontatty/hooks';

import type { TUseMultipleGoals } from '@/types/hooks';

const useGoalsMultiple = ({ goals, additionalValue = 0, leverage }: TUseMultipleGoals): { percentage: number; amount: number } => {
  const { raised } = useMultipleGoals(goals);

  return useMemo<{ percentage: number; amount: number }>(() => {
    const amount = raised + additionalValue;

    const percent = amount / leverage;

    const percentage = Math.max(
      Math.min(percent || 0, 1),
      0
    );

    return { percentage, amount };
  }, [additionalValue, leverage, raised]);
}

export default useGoalsMultiple;
