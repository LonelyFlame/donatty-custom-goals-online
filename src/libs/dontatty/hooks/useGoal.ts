import { useRef, useState, useEffect } from 'react';

import DGoal from '../DGoal';

const useGoal = (widgetLink? : string) => {
  const ref = useRef<DGoal | null>(null);

  const [goal, setGoal] = useState<number>(0);
  const [raised, setRaised] = useState<number>(0);

  useEffect(() => {
    if (!widgetLink) return;

    const goal = new DGoal(widgetLink);
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
  }, [widgetLink]);

  return { goal, raised };
}

export default useGoal;
