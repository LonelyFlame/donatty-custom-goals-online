import { HEART_RATE_RESET } from './constants';

export const sin = (x: number) => Math.sin(x);

export const heartRate = (x: number) => {
  const period = x % HEART_RATE_RESET;
  const c = -0.4;

  if (period < Math.PI / 2) {
    return 0;
  }
  if (period > ((Math.PI / 2) + 0.5) && period <= ((3 * Math.PI / 4) + 0.5)) {
    return c * (Math.sin((period - 0.5) * 4) / 5);
  }
  if (period > Math.PI && period <= 3.3) {
    return c * Math.max(-1 * Math.tan(period * 4), -0.5);
  }
  if (period > 3.3 && period <= 3.63) {
    return c * Math.max(Math.min(-1 / Math.tan(period * 6), 2.4), -0.5);
  }
  if (period > 3.63 && period <= 3.87) {
    return c * Math.max(1 / Math.tan(period * 8), -1.2);
  }
  if (period > 3.87 && period <= 3.97) {
    return c * Math.tan(period * 7.9);
  }
  if (period > 3.97 && period <= 4.20) {
    return c * (((-1 / Math.tan(period - 1.2)) / (8 * Math.PI)) - 0.1);
  }
  if (period > 4.20 && period <= 4.6) {
    return c * ((Math.cos((period * 13) + 0.6) / 6) + 0.14);
  }
  if (period > 4.6 && period <= 5) {
    return c * ((Math.cos((period * 13) + 0.6) / 17) + 0.06);
  }
  return 0;
};
