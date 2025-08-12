'use client';

import { useRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import useGoals from '@/hooks/useGoals';
import type { TOppositeVariants } from '@/types/widgets';

import Filling from './Filling';
import Contestation from './Contestation';

interface Props extends PropsWithChildren {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  timer?: number;
  variant?: TOppositeVariants;
}

const Items = ({ goal, goalSecondary, leverage, liquid, timer = 0, children, variant }: Props) => {
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
      {variant === 'filling' && (
        <Filling
          isOpposite={Boolean(goalSecondary)}
          percentPrimary={percentPrimary}
          percentSecondary={percentSecondary}
          liquid={liquid}
        >
          {children}
        </Filling>
      )}
      {variant === 'contestation' && (
        <Contestation
          percentPrimary={percentPrimary}
          percentSecondary={percentSecondary}
          liquid={liquid}
        >
          {children}
        </Contestation>
      )}
    </>
  )
};

export default Items;
