import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import type { TWidgetOscilloscope } from '@/types/widgets';

import { colorValidator, goalLinkValidator } from './validators';

export const validateOscilloscopeWidget = (data: TWidgetOscilloscope): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  const goalValidate = goalLinkValidator(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = goalLinkValidator(data.goalSecondary, false);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.timer && !isNumber(data.timer)) {
    errors.timer = 'emptyOrNumber';
  }

  if (data.leverage && !isNumber(data.leverage)) {
    errors.leverage = 'emptyOrNumber';
  }

  if (!data.variant || !['sin', 'heart'].includes(data.variant)) {
    errors.variant = 'requiredOneOf:sin,heart';
  }

  const colorValidate = colorValidator(data.color);
  if (isString(colorValidate)) {
    errors.color = colorValidate;
  }

  const colorSecondaryValidate = colorValidator(data.colorSecondary);
  if (isString(colorSecondaryValidate)) {
    errors.colorSecondary = colorSecondaryValidate;
  }

  const colorTertiaryValidate = colorValidator(data.colorTertiary);
  if (isString(colorTertiaryValidate)) {
    errors.colorTertiary = colorTertiaryValidate;
  }

  return errors;
};
