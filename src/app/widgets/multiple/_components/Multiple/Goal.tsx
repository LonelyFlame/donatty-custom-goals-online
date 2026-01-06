'use client';

import cn from 'classnames';
import { useRef, useEffect, useState } from 'react';

import useGoalsMultiple from '@/hooks/useGoalsMultiple';

import styles from './Multiple.module.scss';
import { getLabel } from './utils';

interface Props {
  goals: string[];
  additionalValue: number;
  leverage: number;
  timer?: number;
  text?: string;
}

const Goal = ({ goals, additionalValue, leverage, timer = 0, text }: Props) => {
  const timeoutRef = useRef<number|undefined>(undefined);

  const { percentage, amount } = useGoalsMultiple({ goals, additionalValue, leverage });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setPercent(percentage > 0 ? percentage : 0);
    }, timer * 1000);
  }, [percentage, timer]);

  const label = text ? getLabel(text, amount, leverage, percentage) : '';

  return (
    <>
      <div className={cn('item', 'right', styles.right, styles.item )}>
        <div
          style={{ width: `${percent * 100}%` }}
          className={cn('fill', styles.fill)}
        >
          <div className={cn('image', styles.image)} />
        </div>
      </div>

      {label && <div className={cn('text', styles.text)}>{label}</div>}
    </>
  )
};

export default Goal;
