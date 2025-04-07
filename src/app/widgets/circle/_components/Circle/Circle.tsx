'use client';

import cn from 'classnames';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';

import useGoals from '@/hooks/useGoals';
import { matchPercents } from '@/utils/numbers';

import Item from './Item';
import { getPolygon, getDegrees } from './utils';
import styles from './Circle.module.scss';

interface Props {
  goal: string;
  goalSecondary?: string;
  image: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
  delay?: number;
}

const ANIMATION_STEP = 0.01;
const DEFAULT_DELAY = 200;

const Circle = ({
  goal,
  goalSecondary,
  image,
  imageSecondary,
  leverage,
  rotate,
  half,
  delay = 0,
}: Props) => {
  const isOpposite = Boolean(goalSecondary);

  const timeoutRef = useRef<number|undefined>(undefined);
  const percentRef = useRef<number>(0);

  const percent = useGoals({ goal, goalSecondary, leverage });

  const [animatedPercent, setAnimatedPercent] = useState<number>(0);

  const animate = useCallback(() => {
    clearTimeout(timeoutRef.current);

    setAnimatedPercent((current) => {
      const percent = percentRef.current;
      const sign: 1 | -1 = current <= percent ? 1 : -1;
      const localPercent = current + (ANIMATION_STEP * sign);

      const needAnimate = !matchPercents(localPercent, percent);
      if (needAnimate) {
        timeoutRef.current = window.setTimeout(() => {
          animate();
        }, DEFAULT_DELAY);
      }

      return localPercent;
    });
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    percentRef.current = percent;
    timeoutRef.current = window.setTimeout(() => {
      animate();
    }, delay * 1000 || (DEFAULT_DELAY * 2));

    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, [percent, delay, animate]);

  const degrees = useMemo<number>(() => {
    return getDegrees(animatedPercent, half, isOpposite);
  }, [animatedPercent, half, isOpposite]);

  const polygon = useMemo<string>(() => {
    return getPolygon(degrees);
  }, [degrees]);

  return (
    <div
      style={{
        '--image': `url(${image})`,
        '--imageSecondary': `url(${imageSecondary})`,
      } as CSSProperties}
      className={cn('container', styles.circle)}
    >
      {animatedPercent >= 0 && (
        <Item
          polygon={polygon}
          degrees={rotate ? degrees : 0}
        />
      )}
      {isOpposite && animatedPercent <= 0 && (
        <Item
          polygon={polygon}
          degrees={rotate ? degrees : 0}
          isSecondary
        />
      )}
    </div>
  )
};

export default Circle;
