import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetOpposite } from '@/types/widgets';

import { goalValidator, colorValidator } from './validators';

export const validateOppositeWidget = (data: TWidgetOpposite): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.goal) {
    errors.goal = 'required';
  }

  const goalValidate = goalValidator(data.goal);
  if (isString(goalValidate)) {
    errors.goal = goalValidate;
  }

  const goalSecondaryValidate = goalValidator(data.goalSecondary);
  if (isString(goalSecondaryValidate)) {
    errors.goalSecondary = goalSecondaryValidate;
  }

  if (data.delay && !isNumber(data.delay)) {
    errors.delay = 'emptyOrNumber';
  }

  if (data.leverage && !isNumber(data.leverage)) {
    errors.leverage = 'emptyOrNumber';
  }

  if (data.liquid) {
    const validate = colorValidator(data.colorTertiary);

    if (isString(validate)) {
      errors.colorTertiary = validate;
    }
  }

  const colorValidate = colorValidator(data.color);
  if (isString(colorValidate)) {
    errors.color = colorValidate;
  }

  const colorSecondaryValidate = colorValidator(data.colorSecondary);
  if (isString(colorSecondaryValidate)) {
    errors.colorSecondary = colorSecondaryValidate;
  }

  return errors;
};
