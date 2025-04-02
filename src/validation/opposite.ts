import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetOpposite } from '@/types/widgets';

import { validateGoal, validateColor } from './validators';

export const validateOppositeWidget = (data: TWidgetOpposite): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.goal) {
    errors.goal = 'required';
  }

  const goalValidate = validateGoal(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = validateGoal(data.goalSecondary);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.delay && !isNumber(data.delay)) {
    errors.delay = 'enptyOrNumber';
  }

  if (data.leverage && !isNumber(data.leverage)) {
    errors.leverage = 'enptyOrNumber';
  }

  if (data.liquid) {
    const validate = validateColor(data.bubblesColor);

    if (isString(validate)) {
      errors.bubblesColor = validate;
    }
  }

  const colorValidate = validateColor(data.color);
  if (isString(colorValidate)) {
    errors.color = colorValidate;
  }

  const colorSecondaryValidate = validateColor(data.colorSecondary);
  if (isString(colorSecondaryValidate)) {
    errors.colorSecondary = colorSecondaryValidate;
  }

  return errors;
};
