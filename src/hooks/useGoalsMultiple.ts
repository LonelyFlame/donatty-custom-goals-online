'use client'

import { useMemo } from 'react';

import { useMultipleGoals } from '@/libs/dontatty/hooks';

import type { TUseMultipleGoals } from '@/types/hooks';

const useGoalsMultiple = ({ goals, additionalValue = 0, leverage }: TUseMultipleGoals): number => {
  const { raised } = useMultipleGoals(goals);

  return useMemo<number>(() => {
    const total = raised + additionalValue;

    const percent = total / leverage;

    return Math.max(
      Math.min(percent || 0, 1),
      0
    );
  }, [additionalValue, leverage, raised]);
}

export default useGoalsMultiple;
