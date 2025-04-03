'use client';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import useGoals from '@/hooks/useGoals';

import { calculateDegrees } from './utils';
import styles from './Clock.module.scss';

interface Props {
  goal: string;
  goalSecondary?: string;
  image: string;
  leverage?: number;
  infinite?: boolean;
  half?: boolean;
  delay?: number;
}

const Clock = ({
  goal,
  goalSecondary,
  image,
  leverage,
  infinite,
  half,
  delay = 0,
}: Props) => {
  const isOpposite = Boolean(goalSecondary);
  const isInfinite = infinite && !half && !isOpposite;

  const timeoutRef = useRef<number|undefined>(undefined);

  const percent = useGoals({ goal, goalSecondary, leverage, infinite: isInfinite });

  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      const degrees = calculateDegrees(percent, half, isOpposite);

      setDegrees(degrees);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [percent, delay, half, isOpposite]);

  return (
    <div
      style={{
        '--image': `url(${image})`,
      } as CSSProperties}
      className={cn('container', styles.clock)}
    >
      <div className={cn('image', styles.image)} style={{ transform: `rotate(${degrees}deg)` }} />
    </div>
  )
};

export default Clock;
