import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetClock } from '@/types/widgets';

import { goalValidator } from './validators';

export const validateClockWidget = (data: TWidgetClock): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.goal) {
    errors.goal = 'required';
  }

  const goalValidate = goalValidator(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = goalValidator(data.goalSecondary, false);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.delay && !isNumber(data.delay)) {
    errors.delay = 'emptyOrNumber';
  }

  if (data.leverage && !isNumber(data.leverage)) {
    errors.leverage = 'emptyOrNumber';
  }

  if (!data.image) {
    errors.image = 'required';
  }

  return errors;
};
