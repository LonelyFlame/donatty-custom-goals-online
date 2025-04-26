import isString from 'lodash/isString';

import type { TWidgetCR } from '@/types/widgets';

import { crProjectLinkValidator, colorValidator } from './validators';

export const validateCrWidget = (data: TWidgetCR): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  const crProjectLinkValidate = crProjectLinkValidator(data.project);
  if (isString(crProjectLinkValidate)) {
    errors.project = crProjectLinkValidate;
  }

  const colorValidate = colorValidator(data.color, { notTransparent: true });
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
