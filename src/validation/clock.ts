import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetClock } from '@/types/widgets';

import { validateGoal } from './validators';

export const validateClockWidget = (data: TWidgetClock): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.goal) {
    errors.goal = 'required';
  }

  const goalValidate = validateGoal(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = validateGoal(data.goalSecondary, false);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.delay && !isNumber(data.delay)) {
    errors.delay = 'enptyOrNumber';
  }

  if (data.leverage && !isNumber(data.leverage)) {
    errors.leverage = 'enptyOrNumber';
  }

  if (!data.image) {
    errors.image = 'required';
  }

  return errors;
};
