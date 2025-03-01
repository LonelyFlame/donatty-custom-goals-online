import { useRef, useState, useEffect } from 'react';

import DGoal from '../DGoal';

const useGoal = (widgedLink? : string) => {
  const ref = useRef<DGoal | null>(null);

  const [goal, setGoal] = useState<number>(0);
  const [raised, setRaised] = useState<number>(0);

  useEffect(() => {
    if (!widgedLink) return;

    const goal = new DGoal(widgedLink);
    goal.onData = ({ goal, raised }) => {
      setGoal(goal);
      setRaised(raised);
    }
    goal.start();

    ref.current = goal;

    return () => {
      goal.stop();
      ref.current = null;
    };
  }, [widgedLink]);

  return { goal, raised };
}

export default useGoal;
