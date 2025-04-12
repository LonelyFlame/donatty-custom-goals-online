'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { InputNumber } from 'antd';
import { PauseCircleTwoTone } from '@ant-design/icons';
import type { KeyboardEvent } from 'react';

import { matchPercents } from '@/utils/numbers';
import useAlert from '@/hooks/useAlert';
import Visualisation from '@/components/common/Oscilloscope';
import { MIN_BY_MLSECS } from '@/constants/datetime';
import { BEEP_SFX_URL, DEATH_SFX_URL } from '@/constants/widgets';
import type { TOscilloscopeVariants } from '@/types/widgets';

import { resetSFX } from './utils';
import {
  ANIMATION_STEP,
  DEFAULT_DELAY,
  MAX_PERCENT_SFX,
  MAX_SFX_DELAY,
  BEEP_SFX_DURATION,
  DEATH_SFX_DURATION,
} from './constants';
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
  goals?: string[];
  sfx?: boolean;
}

const beepSFX = typeof window !== 'undefined' && new Audio(BEEP_SFX_URL);
const deathSFX = typeof window !== 'undefined' && new Audio(DEATH_SFX_URL);

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
  goals,
  sfx = true,
}: Props) => {
  const tick = (timer * MIN_BY_MLSECS) / 100;
  const step = leverage / 100;

  const percentRef = useRef<number>(0);
  const timeoutRef = useRef<number|undefined>(undefined);
  const pauseRef = useRef<boolean>(true);

  const [value, setValue] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  const [percentValue, setPercentValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number | null>(0);

  const rememberValue = useCallback((value: number) => {
    if (slug) {
      localStorage.setItem(`${slug}_value`, String(value));
    }
  }, [slug]);

  const handleAlert = useCallback(({ amount }: { amount: number }) => {
    setValue((current) => {
      const newValue = Math.max(0, Math.min(leverage, current + amount));

      rememberValue(newValue);
      return newValue;
    });
  }, [leverage, rememberValue]);
  useAlert(alert, handleAlert, goals);

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
    setInputValue(0);

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

  useEffect(() => {
    if (!sfx) return;

    let sfxTimeout: number | undefined;

    const playSFX = () => {
      const sfxPercent = percentValue / MAX_PERCENT_SFX;
      const sfxDelay = MAX_SFX_DELAY * sfxPercent;
      const sfxDuration = percentValue === 0 ? DEATH_SFX_DURATION : BEEP_SFX_DURATION;
      const timeoutDuration = sfxDelay + sfxDuration;

      const beepSFXMuted = percentValue === 0 || percentValue >= MAX_PERCENT_SFX;
      resetSFX(beepSFX, beepSFXMuted || pause);

      const deathSFXMuted = percentValue > 0;
      resetSFX(deathSFX, deathSFXMuted || pause);

      sfxTimeout = window.setTimeout(playSFX, timeoutDuration);
    };
    playSFX();

    return () => {
      clearTimeout(sfxTimeout);
    };
  }, [sfx, pause, percentValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key !== 'Enter') return;

    handleAlert({ amount: Number(inputValue) || 0 });
    setInputValue(0);
  };

  return (
    <>
      <div className={styles.lss} onClick={handleClick}>
        <Visualisation
          color={colorSecondary}
          colorSecondary={colorTertiary}
          colorEmpty={color}
          fade={fade}
          variant={variant}
          percent={percentValue}
        />
      </div>
      {pause && (
        <>
          <PauseCircleTwoTone
            onClick={handleClick}
            twoToneColor="#808080"
            className={cn('pause', styles.pauseIcon)}
          />
          <InputNumber
            onKeyDown={handleKeyDown}
            className={cn('input', styles.change)}
            value={inputValue}
            onChange={setInputValue}
            size="large"
          />
        </>
      )}
    </>
  );
};

export default Lss;
