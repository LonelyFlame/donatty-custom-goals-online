'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

import useGoals from '@/hooks/useGoals';
import { matchPercents } from '@/utils/numbers';
import Visualisation from '@/components/common/Oscilloscope';
import type { TOscilloscopeVariants } from '@/types/widgets';

interface Props {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  color: string;
  colorSecondary?: string;
  colorTertiary?: string;
  delay?: number;
  amplitude?: number;
  speed?: number;
  fade?: boolean;
  variant?: TOscilloscopeVariants;
}

export const ANIMATION_STEP = 0.01;
export const DEFAULT_DELAY = 50;

const Oscilloscope = ({
  goal,
  goalSecondary,
  leverage,
  color,
  colorSecondary,
  colorTertiary,
  delay = 0,
  fade,
  variant,
}: Props) => {
  const isOpposite = Boolean(goalSecondary);

  const percentRef = useRef<number>(0);
  const timeoutRef = useRef<number|undefined>(undefined);

  const [percentValue, setPercentValue] = useState<number>(0);

  const percent = useGoals({ goal, goalSecondary, leverage });

  const handleUpdatePercent = useCallback(() => {
    clearTimeout(timeoutRef.current);

    const percent = percentRef.current;

    setPercentValue((current) => {
      const totalPercent = isOpposite
        ? (percent + 1) / 2
        : percent;

      if (current === totalPercent) return current

      const sign: 1 | -1 = current <= totalPercent ? 1 : -1;
      const localPercent = current + (ANIMATION_STEP * sign);

      const isMatched = matchPercents(localPercent, totalPercent);
      if (!isMatched) {
        timeoutRef.current = window.setTimeout(() => {
          handleUpdatePercent();
        }, DEFAULT_DELAY);
      }

      return Math.max(Math.min(localPercent, 1), 0);
    });
  }, [isOpposite]);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    percentRef.current = percent;

    timeoutRef.current = window.setTimeout(() => {
      handleUpdatePercent();
    }, delay * 1000 || (DEFAULT_DELAY * 2));
  }, [delay, percent, handleUpdatePercent]);

  return (
    <Visualisation
      color={color}
      colorSecondary={colorSecondary}
      colorFull={colorTertiary}
      fade={fade}
      variant={variant}
      percent={percentValue}
    />
  );
};

export default Oscilloscope;
