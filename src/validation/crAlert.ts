import isString from 'lodash/isString';

import type { TWidgetCRAlert } from '@/types/widgets';

import { crProjectLinkValidator, colorValidator } from './validators';

export const validateCrAlertWidget = (data: TWidgetCRAlert): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'required';
  }

  const crProjectLinkValidate = crProjectLinkValidator(data.project);
  if (isString(crProjectLinkValidate)) {
    errors.project = crProjectLinkValidate;
  }

  if (!data.text) {
    errors.text = 'required';
  }

  if (!data.delay) {
    errors.delay = 'required';
  }

  const colorValidate = colorValidator(data.color, { notTransparent: true });
  if (isString(colorValidate)) {
    errors.color = colorValidate;
  }

  return errors;
};
