'use client';

import { useRef, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import useGoals from '@/hooks/useGoals';
import type { TOppositeVariants } from '@/types/widgets';

import Parts from '../Parts';

import Filling from './Filling';
import Contestation from './Contestation';
import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  timer?: number;
  variant?: TOppositeVariants;
  parts?: number[];
}

const Items = ({ goal, goalSecondary, leverage, liquid, timer = 0, children, variant, parts }: Props) => {
  const timeoutRef = useRef<number|undefined>(undefined);

  const { percent, goalLeverage, goalLeverageSecondary } = useGoals({ goal, goalSecondary, leverage });

  const [percentPrimary, setPercentPrimary] = useState(0);
  const [percentSecondary, setPercentSecondary] = useState(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPercentSecondary(percent < 0 ? -percent : 0);
      setPercentPrimary(percent > 0 ? percent : 0);
    }, timer * 1000);
  }, [percent, timer]);

  const isFilling = variant === 'filling' || !goalSecondary;
  const isContestation = variant === 'contestation';

  return (
    <>
      {!!parts?.length && (
        <div className={styles.parts}>
          {Boolean(goalSecondary) &&
            <Parts parts={parts} leverage={goalLeverageSecondary} className={styles.partsSecondary} />
          }
          <Parts parts={parts} leverage={goalLeverage} />
        </div>
      )}
      {isFilling && (
        <Filling
          isOpposite={Boolean(goalSecondary)}
          percentPrimary={percentPrimary}
          percentSecondary={percentSecondary}
          liquid={liquid}
        >
          {children}
        </Filling>
      )}
      {isContestation && (
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
