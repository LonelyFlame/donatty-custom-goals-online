import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetOpposite } from '@/types/widgets';

import { goalLinkValidator, colorValidator, partsValidator } from './validators';

export const validateOppositeWidget = (data: TWidgetOpposite): Record<string, string> => {
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

  const colorSecondaryValidate = Boolean(data.colorSecondary) && colorValidator(data.colorSecondary);
  if (isString(colorSecondaryValidate)) {
    errors.colorSecondary = colorSecondaryValidate;
  }

  if (!data.variant || !['filling', 'contestation'].includes(data.variant)) {
    errors.variant = 'requiredOneOf:filling,contestation';
  }

  const partsValidate = !data.parts?.length || partsValidator(data.parts);
  if (partsValidate) {
    errors.parts = 'emptyOrIntegers';
  }

  return errors;
};
