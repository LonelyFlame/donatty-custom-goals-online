'use client';

import { useEffect, useState, useRef, useCallback, useMemo, type CSSProperties } from 'react';
import cn from 'classnames';
import { InputNumber } from 'antd';
import { PauseCircleTwoTone } from '@ant-design/icons';
import type { KeyboardEvent } from 'react';
import type { Scale } from 'chroma-js';

import useAlert from '@/hooks/useAlert';
import { getColorScale } from '@/utils/colors';
import Visualisation from '@/components/common/Oscilloscope';
import { FontWrapper } from '@/components/common/Fonts';
import { SEC_BY_MLSECS } from '@/constants/datetime';
import { BEEP_SFX_URL, DEATH_SFX_URL } from '@/constants/widgets';
import type { TOscilloscopeVariants } from '@/types/widgets';

import { getTimerDisplay, resetSFX } from './utils';
import {
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
  font?: string;
  fontSize?: number;
}

const beepSFX = typeof window !== 'undefined' && new Audio(BEEP_SFX_URL);
const deathSFX = typeof window !== 'undefined' && new Audio(DEATH_SFX_URL);

const Lss = ({
  alert,
  leverage,
  color,
  colorSecondary,
  colorTertiary,
  timer, // in minutes
  fade,
  variant,
  slug,
  goals,
  sfx,
  font = 'roboto',
  fontSize,
}: Props) => {
  const timerBySeconds = timer * 60; // timer in seconds
  const valueStep = leverage / timerBySeconds; // value per second

  const colorScaleRef = useRef<Scale>(getColorScale([colorSecondary, colorTertiary], { notTransparent: true }));
  const timeoutRef = useRef<number|undefined>(undefined);
  const valueRef = useRef<number>(0);
  const pauseRef = useRef<boolean>(true);

  const [value, setValue] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<number | null>(0);

  const percentValue = value / leverage;
  const showTimer = pause || percentValue <= 0.1 || percentValue >= 0.9;

  const timerDisplay = useMemo(() => {
    return getTimerDisplay(timer, percentValue);
  }, [percentValue, timer]);

  const rememberValue = useCallback((value: number) => {
    if (slug) {
      localStorage.setItem(`${slug}_value`, String(value));
    }
  }, [slug]);

  const handleAlert = useCallback(({ amount }: { amount: number }) => {
    const newValue = Math.max(0, Math.min(leverage, valueRef.current + amount));

    valueRef.current = newValue;

    rememberValue(newValue);
  }, [leverage, rememberValue]);
  useAlert(alert, handleAlert, goals);

  const scheduleAnimate = (delay: number = DEFAULT_DELAY) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setValue((currentValue) => {
        const targetValue = valueRef.current;
        const sign: 1 | -1 = targetValue <= currentValue ? -1 : 1;

        scheduleAnimate(sign > 0 ? DEFAULT_DELAY : SEC_BY_MLSECS);

        if (pauseRef.current) {
          return targetValue;
        }

        const newValue = Math.max(currentValue + (valueStep * sign), 0);

        if (sign < 0) {
          valueRef.current = newValue;
          rememberValue(newValue);
        }

        return newValue;
      })
    }, delay)
  };

  const handleClick = () => {
    const paused = !pauseRef.current;

    pauseRef.current = paused;
    setPause(paused);
    setInputValue(0);
  };

  useEffect(() => {
    scheduleAnimate();

    if (!slug) {
      return;
    }

    const initialValue = Number(localStorage.getItem(`${slug}_value`)) || 0;

    setValue(initialValue);
    valueRef.current = initialValue;
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
    <FontWrapper
      className={cn('container', styles.container)}
      slug={font}
      style={{
        ...(!!fontSize && { '--fontSize': `${fontSize}px` }),
      } as CSSProperties}
    >
      <div
        className={cn('timer', styles.timer)}
        style={{
          opacity: showTimer ? 1 : 0,
          color: percentValue === 0 ? color : colorScaleRef.current(percentValue).toString(),
        }}
      >
        {timerDisplay}
      </div>
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
    </FontWrapper>
  );
};

export default Lss;
