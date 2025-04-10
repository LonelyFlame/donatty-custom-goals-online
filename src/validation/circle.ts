import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { TWidgetCircle } from '@/types/widgets';

import { goalLinkValidator } from './validators';

export const validateCircleWidget = (data: TWidgetCircle): Record<string, string> => {
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

  if (!data.image) {
    errors.image = 'required';
  }

  if (!data.imageSecondary && !!data.goalSecondary) {
    errors.image = 'required';
  }

  return errors;
};
