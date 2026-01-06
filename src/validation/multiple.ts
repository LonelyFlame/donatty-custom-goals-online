import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetMultiple } from '@/types/widgets';

import { multipleGoalLinkValidator, colorValidator } from './validators';

export const validateMultipleWidget = (data: TWidgetMultiple): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  const goalValidate = multipleGoalLinkValidator(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = multipleGoalLinkValidator(data.goalSecondary, false);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.timer && !isNumber(data.timer)) {
    errors.timer = 'emptyOrNumber';
  }

  if (!data.leverage || !isNumber(data.leverage)) {
    errors.leverage = 'emptyOrNumber';
  }

  const colorValidate = colorValidator(data.color);
  if (isString(colorValidate)) {
    errors.color = colorValidate;
  }

  return errors;
};
