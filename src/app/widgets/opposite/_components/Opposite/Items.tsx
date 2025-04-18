'use client';

import cn from 'classnames';
import { useRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import useGoals from '@/hooks/useGoals';

import Item from './Item';
import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  timer?: number;
}

const Items = ({ goal, goalSecondary, leverage, liquid, timer = 0, children }: Props) => {
  const timeoutRef = useRef<number|undefined>(undefined);

  const percent = useGoals({ goal, goalSecondary, leverage });

  const [percentPrimary, setPercentPrimary] = useState(0);
  const [percentSecondary, setPercentSecondary] = useState(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPercentSecondary(percent < 0 ? -percent : 0);
      setPercentPrimary(percent > 0 ? percent : 0);
    }, timer * 1000);
  }, [percent, timer]);

  return (
    <>
      {!!goalSecondary && (
        <Item className={cn('left', styles.left)} percent={percentSecondary} liquid={liquid}>
          {children}
        </Item>
      )}
      <Item className={cn('right', styles.right)} percent={percentPrimary} liquid={liquid}>
        {children}
      </Item>
    </>
  )
};

export default Items;
