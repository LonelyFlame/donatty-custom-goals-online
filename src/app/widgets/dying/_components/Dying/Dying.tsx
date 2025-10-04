'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { InputNumber } from 'antd';
import { PauseCircleTwoTone } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import type { KeyboardEvent } from 'react';
import type { Scale } from 'chroma-js';

import useAlert from '@/hooks/useAlert';
import { getColorScale } from '@/utils/colors';
import Visualisation from '@/components/common/Oscilloscope';
import { FontWrapper } from '@/components/common/Fonts';
import widgets from '@/translations/widgets';
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
  NEGATIVE_MULTIPLIER,
  POSITIVE_MULTIPLIER,
} from './constants';
import styles from './Dying.module.scss';

interface Props {
  alert: string;
  leverage: number;
  leverageSecondary: number;
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

const Dying = ({
  alert,
  leverage,
  leverageSecondary,
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
  const valueTotalRef = useRef<number>(0);
  const pauseRef = useRef<boolean>(true);

  const [value, setValue] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<number | null>(0);
  const [inputValueTotal, setInputValueTotal] = useState<number | null>(0);

  const percentValue = Math.min(value, leverageSecondary) / leverageSecondary;
  const percentValueTotal = value / leverage;
  const showTimer = pause || percentValueTotal <= 0.1 || percentValueTotal >= 0.9;

  const timerDisplay = useMemo(() => {
    return getTimerDisplay(timer, percentValueTotal);
  }, [timer, percentValueTotal]);

  const rememberValue = useCallback((value?: number, valueTotal?: number) => {
    if (slug) {
      if (value) {
        localStorage.setItem(`${slug}_value`, String(value));
      }

      if (valueTotal) {
        localStorage.setItem(`${slug}_value_total`, String(valueTotal));
      }
    }
  }, [slug]);

  const handleAlert = useCallback(({ amount }: { amount: number }) => {
    const valueTotal = valueTotalRef.current;
    const calculatedAmount = Math.min(amount, leverage - valueTotal);

    if(valueTotal >= leverage) {
      return;
    }

    const newValue = Math.max(0, Math.min(leverage, valueRef.current + calculatedAmount));
    valueRef.current = newValue;

    const newValueTotal = valueTotal + calculatedAmount;
    valueTotalRef.current = newValueTotal;

    rememberValue(newValue, newValueTotal);
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

        const multiplier = sign > 0 ? POSITIVE_MULTIPLIER : NEGATIVE_MULTIPLIER;
        const newValue = Math.min(Math.max(currentValue + (valueStep * sign * multiplier), 0), targetValue);

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
    setInputValue(paused ? valueRef.current || 0 : 0);
    setInputValueTotal(paused ? valueTotalRef.current || 0 : 0);
  };

  useEffect(() => {
    scheduleAnimate();

    if (!slug) {
      return;
    }

    const initialValue = Number(localStorage.getItem(`${slug}_value`)) || 0;

    setValue(initialValue);
    valueRef.current = initialValue;

    const initialTotalValue = Number(localStorage.getItem(`${slug}_value_total`)) || 0;
    valueTotalRef.current = initialTotalValue;
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

    const newValue = Number(inputValue) || 0 ;

    valueRef.current = newValue;

    rememberValue(newValue);
  };

  const handleKeyDownTotal = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key !== 'Enter') return;

    const newValue = Number(inputValueTotal) || 0 ;

    valueTotalRef.current = newValue;

    rememberValue(newValue, newValue);
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
          <div className={styles.valueContainer}>
            <div className={styles.value}>
              {widgets.dying.value}
              <InputNumber
                onKeyDown={handleKeyDown}
                className={cn('input', styles.change)}
                value={inputValue}
                onChange={setInputValue}
                size="large"
              />
            </div>
            <div className={styles.value}>
              {widgets.dying.valueTotal}
              <InputNumber
                onKeyDown={handleKeyDownTotal}
                className={cn('input', styles.change)}
                value={inputValueTotal}
                onChange={setInputValueTotal}
                size="large"
              />
            </div>
          </div>
        </>
      )}
    </FontWrapper>
  );
};

export default Dying;
