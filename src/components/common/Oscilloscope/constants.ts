import { heartRate, sin } from './plots';

export const MAX_AMPLITUDE = 400;

export const HEART_RATE_RESET = 10;

export const VARIANTS = {
  sin: {
    getSpeed: (percent: number) => percent * (2 * (1.5 - percent)),
    getFrequencyStep: (percent: number) => (0.5 + percent) / Math.pow(Math.PI, 4),
    reset: 2 * Math.PI,
    plot: sin,
  },
  heart: {
    getSpeed: (percent: number) => {
      if (percent <= 0.25) { // ~45bpm -> ~135bpm
        return getHeartSpeedByPart( // 0.40 -> 1.25
          percent,
          {
            partSize: 0.80,
            nextStepEnd: 0.30,
            nextStepsSize: 0.75,
            prevStepsSize: 0,
          }
        );
      }

      if (percent <= 0.75) { // ~80 -> ~45bpm
        return getHeartSpeedByPart( // 0.70 -> 0.40
          percent,
          {
            partSize: 0.30,
            nextStepEnd: 0.70,
            nextStepsSize: 0.25,
            prevStepsSize: 0.25,
            direction: -1,
          }
        );
      }

      return 0.70; // ~80bpm
    },
    getFrequencyStep: () => (1.5) / Math.pow(Math.PI, 4),
    reset: HEART_RATE_RESET,
    plot: heartRate,
  },
};

const getHeartSpeedByPart = (
  percent: number,
  {
    partSize,
    nextStepEnd,
    nextStepsSize,
    prevStepsSize,
    direction = 1,
  }: {
    partSize: number;
    nextStepEnd: number;
    nextStepsSize: number;
    prevStepsSize: number;
    direction?: number;
  }
): number => {
  const partStep = 1 - (prevStepsSize + nextStepsSize);
  const partPercent = (percent - prevStepsSize) / partStep;
  const reversedPercent = 1 - partPercent;

  return nextStepEnd + (partSize * reversedPercent * direction);
};
