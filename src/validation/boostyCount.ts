import isString from 'lodash/isString';

import type { TWidgetBoostyCount } from '@/types/widgets';

import { colorValidator, partsValidator } from './validators';

export const validateBoostyCountWidget = (data: TWidgetBoostyCount): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  if (!data.secret) {
    errors.secret = 'required';
  }

  const coloryValidate = Boolean(data.color) && colorValidator(data.color);
  if (isString(coloryValidate)) {
    errors.colorSecondary = coloryValidate;
  }

  const colorSecondaryValidate = Boolean(data.colorSecondary) && colorValidator(data.colorSecondary);
  if (isString(colorSecondaryValidate)) {
    errors.colorSecondary = colorSecondaryValidate;
  }

  const partsValidate = partsValidator(data.parts);
  if (!partsValidate) {
    errors.parts = 'emptyOrIntegers';
  }

  return errors;
};
