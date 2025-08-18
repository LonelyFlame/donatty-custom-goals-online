'use client'

import { useMemo } from 'react';

import { useGoal } from '@/libs/dontatty/hooks';

import type { TUseGoals, TUseGoalsReturnValue } from '@/types/hooks';

const useGoals = ({ goal, goalSecondary, leverage, infinite }: TUseGoals): TUseGoalsReturnValue => {
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
      return percent || 0;
    }

    const max = 1;
    const min = raisedValueSecondary ? -1 : 0;

    return Math.max(
      Math.min(percent || 0, max),
      min
    );
  }, [goalValue, raisedValue, goalValueSecondary, raisedValueSecondary, leverage, infinite]);

  return { percent, goalLeverage: leverage || goalValue, goalLeverageSecondary: leverage || goalValueSecondary };
}

export default useGoals;
