'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { PauseCircleTwoTone } from '@ant-design/icons';

import { useAlert } from '@/libs/dontatty/hooks';
import type { TOnData } from '@/libs/dontatty/hooks/useAlert';

import { matchPercents } from '@/utils/numbers';
import Visualisation from '@/components/common/Oscilloscope';
import { MIN_BY_MLSECS } from '@/constants/datetime';
import type { TOscilloscopeVariants } from '@/types/widgets';
import type { TDCurrency } from '@/libs/dontatty/types/alert';

import styles from './Lss.module.scss';

interface Props {
  alert: string;
  leverage: number;
  color: string;
  colorSecondary: string;
  colorTertiary?: string;
  timer: number;
  fade?: boolean;
  variant?: TOscilloscopeVariants;
  slug?: string;
}

const ANIMATION_STEP = 0.01;
const DEFAULT_DELAY = 50;
const ALERTS_CURRENCY = process.env.NEXT_PUBLIC_ALERTS_CURRENCY
  ? String(process.env.NEXT_PUBLIC_ALERTS_CURRENCY).split(',') as TDCurrency[]
  : undefined;

const Lss = ({
  alert,
  leverage,
  color,
  colorSecondary,
  colorTertiary,
  timer,
  fade,
  variant,
  slug,
}: Props) => {
  const tick = (timer * MIN_BY_MLSECS) / 100;
  const step = leverage / 100;

  const percentRef = useRef<number>(0);
  const timeoutRef = useRef<number|undefined>(undefined);
  const pauseRef = useRef<boolean>(!!slug);

  const [value, setValue] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(!!slug);
  const [percentValue, setPercentValue] = useState<number>(0);

  const rememberValue = useCallback((value: number) => {
    if (slug) {
      localStorage.setItem(`${slug}_value`, String(value));
    }
  }, [slug]);

  const handleAlert = useCallback<TOnData>(({ amount, currency }) => {
    const acceptedCurrency = !!currency && !!ALERTS_CURRENCY?.length && ALERTS_CURRENCY.includes(currency);
    if (!amount || !acceptedCurrency) return;

    setValue((current) => {
      const newValue = Math.min(leverage, current + amount);

      rememberValue(newValue);
      return newValue;
    });
  }, [leverage, rememberValue]);
  useAlert(alert, handleAlert);

  const handleSchedulePercentTick = useCallback(() => {
    if (pauseRef.current) return;

    timeoutRef.current = window.setTimeout(() => {
      if (pauseRef.current) return;

      setValue((current: number) => {
        const newValue = Math.max(0, current - step);

        rememberValue(newValue);
        return newValue;
      });
    }, tick);
  }, [rememberValue, step, tick]);

  const handleUpdatePercent = useCallback(() => {
    clearTimeout(timeoutRef.current);

    const percent = percentRef.current;

    setPercentValue((current) => {
      if (current === percent) {
        handleSchedulePercentTick();

        return current;
      }

      const sign: 1 | -1 = current <= percent ? 1 : -1;
      const localPercent = current + (ANIMATION_STEP * sign);

      const isMatched = matchPercents(localPercent, percent);
      if (isMatched) {
        handleSchedulePercentTick();
      } else {
        timeoutRef.current = window.setTimeout(() => {
          handleUpdatePercent();
        }, DEFAULT_DELAY);
      }

      return Math.max(Math.min(localPercent, 1), 0);
    });
  }, [handleSchedulePercentTick]);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    percentRef.current = value / leverage;

    timeoutRef.current = window.setTimeout(() => {
      handleUpdatePercent();
    }, DEFAULT_DELAY);
  }, [value, leverage, handleUpdatePercent]);

  const handleClick = () => {
    const paused = !pauseRef.current;

    pauseRef.current = paused;
    setPause(paused);

    if (!paused) {
      handleUpdatePercent();
    }
  };

  useEffect(() => {
    if (slug) {
      const initialValue = Number(localStorage.getItem(`${slug}_value`));
      setValue(initialValue || 0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.lss} onClick={handleClick}>
      <Visualisation
        color={colorSecondary}
        colorSecondary={colorTertiary}
        colorEmpty={color}
        fade={fade}
        variant={variant}
        percent={percentValue}
      />
      {pause && <PauseCircleTwoTone twoToneColor="#808080" className={styles.pauseIcon} />}
    </div>
  );
};

export default Lss;
