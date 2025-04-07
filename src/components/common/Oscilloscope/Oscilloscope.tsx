'use client';

import { useEffect, useRef, useCallback } from 'react';
import cn from 'classnames';
import chroma from 'chroma-js';
import type { Scale } from 'chroma-js';

import { getColorScale } from '@/utils/colors';
import type { TOscilloscopeVariants } from '@/types/widgets';

import styles from './Oscilloscope.module.scss';
import { MAX_AMPLITUDE, VARIANTS } from './constants';

interface Props {
  color: string;
  colorSecondary?: string;
  colorTertiary?: string;
  colorEmpty?: string,
  colorFull?: string,
  fade?: boolean;
  variant?: TOscilloscopeVariants;
  percent?: number;
}

const Oscilloscope = ({
  color,
  colorSecondary,
  colorTertiary,
  colorEmpty = color,
  colorFull = colorTertiary || colorSecondary || color,
  fade,
  variant = 'sin',
  percent = 0,
}: Props) => {
  const displayRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<number>(0);
  const percentRef = useRef<number>(0);

  const drawWave = useCallback(({
    quart,
    lastQuart,
    colorScale,
  }: { quart: number, lastQuart: number, colorScale: Scale }) => {
    const canvas = displayRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      setTimeout(() => drawWave({ quart, lastQuart, colorScale }), 1000);

      return;
    }

    const {
      plot,
      getSpeed,
      getFrequencyStep,
      reset,
    } = VARIANTS[variant];

    const phase = phaseRef.current;
    const percent = percentRef.current;

    let color = colorScale(percent);
    if (percent <= 0) {
      color = chroma(colorEmpty);
    }
    if (percent >= 1) {
      color = chroma(colorFull);
    }

    const stepAmplitude = (MAX_AMPLITUDE * percent);
    const stepSpeed = getSpeed(percent);
    const frequencyStep = getFrequencyStep(percent);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.strokeStyle = color.toString();

    for (var x = 0; x < canvas.width; x++) {
      const pos = frequencyStep * x;

      let delta = 1;
      if (fade && x <= quart) {
        delta = x / quart;
      }
      if (fade && x >= lastQuart) {
        const quartX = (x - lastQuart);
        delta = 1 - (quartX / quart);
      }

      const y = plot(pos + phase) * stepAmplitude * delta;

      ctx.lineWidth = 5;

      if (x === 0) {
        ctx.moveTo(0, y + (canvas.height / 2));
      } else {
        ctx.lineTo(x, y + (canvas.height / 2));
      }
    }

    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = color.shade(0.25).toString();
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 2;

    ctx.stroke();

    phaseRef.current += stepSpeed / Math.PI;
    if (phase >= 8 && phase % reset < 0.005) {
      phaseRef.current = 0;
    }

    requestAnimationFrame(() => drawWave({ quart, lastQuart, colorScale }));
  }, [fade, colorFull, variant, colorEmpty]);
  const initAnimation = useCallback(() => {
    const canvas = displayRef.current;
    const ctx = canvas?.getContext("2d");

    if(!canvas || !ctx) {
      setTimeout(initAnimation, 1000);

      return;
    }

    const quart = canvas.width / (Math.PI - (Math.E / Math.PI));
    const lastQuart = canvas.width - quart;

    const colorScale = getColorScale([color, colorSecondary, colorTertiary], { notTransparent: true });

    drawWave({
      quart,
      lastQuart,
      colorScale,
    });
  }, [color, colorSecondary, colorTertiary, drawWave]);
  useEffect(() => {
    initAnimation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    percentRef.current = percent;
  }, [percent]);

  return (
    <div className={cn('container', styles.oscilloscope)}>
      <canvas
        ref={displayRef}
        className={cn('display', styles.display)}
        width="1440"
        height="900"
      />
    </div>
  )
};

export default Oscilloscope;
