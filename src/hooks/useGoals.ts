'use client'

import { useMemo } from 'react';

import { useGoal } from '@/libs/dontatty/hooks';

import type { TUseGoals } from '@/types/hooks';

const useGoals = ({ goal, goalSecondary, leverage, infinite }: TUseGoals): number => {
  const { goal: goalValue, raised: raisedValue } = useGoal(goal);
  const { goal: goalValueSecondary, raised: raisedValueSecondary } = useGoal(goalSecondary);

  const percent = useMemo<number>(() => {
    let percent = 0;

    if (leverage) {
      let diff = raisedValue;

      if(raisedValueSecondary) {
        diff = diff - raisedValueSecondary;
      }

      percent = diff / leverage;
    } else {
      percent = raisedValue / goalValue;

      if(raisedValueSecondary) {
        const percentSecondary = raisedValueSecondary / goalValueSecondary;
        percent = percent - percentSecondary;
      }
    }

    if (infinite) {
      return percent;
    }

    const max = 1;
    const min = raisedValueSecondary ? -1 : 0;

    return Math.max(
      Math.min(percent, max),
      min
    );
  }, [goalValue, raisedValue, goalValueSecondary, raisedValueSecondary, leverage, infinite]);

  return percent;
}

export default useGoals;
