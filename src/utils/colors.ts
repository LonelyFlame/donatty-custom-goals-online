import chroma from 'chroma-js';
import type { Scale } from 'chroma-js';

import { validateColor } from '@/validation/colors';
import type { TValidateColorOptions } from '@/validation/colors';
import type { TAntdColorValue } from '@/types/inputs';

export const getColorScale = (
  values: (TAntdColorValue | string | undefined)[],
  options?: TValidateColorOptions,
): Scale => {
  const colors: string[] = [];

  values.forEach((value) => {
    if (!value) return;

    const color = typeof value === 'string'
      ? value
      : value?.toHexString();

    const hasColor = validateColor(color, options);
    if (hasColor) {
      colors.push(color);
    }
  });

  if (!colors.length) {
    colors.push('#808080');
  }

  return chroma.scale(colors);
}
