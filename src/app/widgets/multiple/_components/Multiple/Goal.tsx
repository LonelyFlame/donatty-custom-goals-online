'use client';

import cn from 'classnames';
import { useRef, useEffect, useState } from 'react';

import useGoalsMultiple from '@/hooks/useGoalsMultiple';

import styles from './Multiple.module.scss';

interface Props {
  goals: string[];
  additionalValue: number;
  leverage: number;
  timer?: number;
}

const Goal = ({ goals, additionalValue, leverage, timer = 0 }: Props) => {
  const timeoutRef = useRef<number|undefined>(undefined);

  const targetPercent = useGoalsMultiple({ goals, additionalValue, leverage });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setPercent(targetPercent > 0 ? targetPercent : 0);
    }, timer * 1000);
  }, [targetPercent, timer]);

  return (
    <div className={cn('item', 'right', styles.right, styles.item )}>
      <div
        style={{ width: `${percent * 100}%` }}
        className={cn('fill', styles.fill)}
      >
        <div className={cn('image', styles.image)} />
      </div>
    </div>
  )
};

export default Goal;
