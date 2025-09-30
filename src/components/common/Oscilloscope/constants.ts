import { heartRate, sin } from './plots';
import { getHeartAmplitude, getHeartSpeed } from './utils';

export const MAX_AMPLITUDE = 400;

export const HEART_RATE_RESET = 10;

export const VARIANTS = {
  sin: {
    getAmplitude: (percent: number): number => MAX_AMPLITUDE * percent,
    getSpeed: (percent: number) => percent * (2 * (1.5 - percent)),
    getFrequencyStep: (percent: number) => (0.5 + percent) / Math.pow(Math.PI, 4),
    reset: 2 * Math.PI,
    plot: sin,
  },
  heart: {
    getAmplitude: getHeartAmplitude,
    getSpeed: getHeartSpeed,
    getFrequencyStep: () => (1.5) / Math.pow(Math.PI, 4),
    reset: HEART_RATE_RESET,
    plot: heartRate,
  },
};
