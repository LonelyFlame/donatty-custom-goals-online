import { useMemo } from 'react';

import useDGoal from '@/libs/dontatty/hooks/useGoal';

import type { useGoal } from '@/types/hooks';

const useGoal = ({ goal, goalSecondary, leverage, infinite }: useGoal): number => {
  const { goal: goalValue, raised: raisedValue } = useDGoal(goal);
  const { goal: goalValueSecondary, raised: raisedValueSecondary } = useDGoal(goalSecondary);

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

    return Math.max(Math.min(percent, 1), -1);
  }, [goalValue, raisedValue, goalValueSecondary, raisedValueSecondary, leverage, infinite]);

  return percent;
}

export default useGoal;
