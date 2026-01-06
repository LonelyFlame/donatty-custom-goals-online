import { useRef, useState, useEffect, useMemo } from 'react';

import DGoal from '../DGoal';

const useMultipleGoals = (widgetLinks: string[]) => {
  const ref = useRef<DGoal[]>([]);

  const [goals, setGoals] = useState<number[]>([]);
  const [raised, setRaised] = useState<number[]>([]);

  useEffect(() => {
    if (!widgetLinks.length) return;

    widgetLinks.forEach((widgetLink, index) => {
      const goal = new DGoal(widgetLink);
      goal.onData = ({ goal, raised }) => {
        setGoals(prev => {
          const next = [...prev];
          next[index] = goal;

          return next;
        });
        setRaised(prev => {
          const next = [...prev];
          next[index] = raised;

          return next;
        });
      }
      goal.start();

      ref.current.push(goal);
    });

    return () => {
      ref.current.forEach((goal) => {
        goal.stop();
      });

      ref.current = [];
    };
  }, [widgetLinks]);

  const goalsTotal = useMemo(() => {
    return goals.reduce((acc, item) => acc + (item || 0), 0);
  }, [goals]);

  const raisedTotal = useMemo(() => {
    return raised.reduce((acc, item) => acc + item || 0, 0);
  }, [raised]);

  return { goal: goalsTotal, raised: raisedTotal };
}

export default useMultipleGoals;
