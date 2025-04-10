import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import type { TWidgetLSS } from '@/types/widgets';

import { alertLinkValidator, colorValidator } from './validators';

export const validateLssWidget = (data: TWidgetLSS): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  const alertValidate = alertLinkValidator(data.alert);
  if (isString(alertValidate)) {
    errors.alert = alertValidate;
  }

  if (!data.timer || !isNumber(data.timer)) {
    errors.timer = 'requiredNumber';
  }

  if (!data.leverage || !isNumber(data.leverage)) {
    errors.leverage = 'requiredNumber';
  }

  if (!data.variant || !['sin', 'heart'].includes(data.variant)) {
    errors.leverage = 'requiredOneOf:sin,heart';
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
