import { heartRate, sin } from './plots';
export const MAX_AMPLITUDE = 400;

export const HEART_RATE_RESET = 20;

export const VARIANTS = {
  sin: {
    getSpeed: (percent: number) => percent * (2 * (1.5 - percent)),
    getFrequencyStep: (percent: number) => (0.5 + percent) / Math.pow(Math.PI, 4),
    reset: 2 * Math.PI,
    plot: sin,
  },
  heart: {
    getSpeed: (percent: number) => 0.25 + (percent * 0.5),
    getFrequencyStep: () => (1.5) / Math.pow(Math.PI, 4),
    reset: HEART_RATE_RESET,
    plot: heartRate,
  },
};
