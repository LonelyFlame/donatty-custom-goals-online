import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { WIDGET_TYPE_OPPOSITE } from '@/constants/widgets';
import type { TWidget } from '@/types/widgets';

export const validateWidget = (data: TWidget): { isValid: boolean; errors: Record<string, string> } => {
  const { name, type } = data;

  let errors: Record<string, string> = {};

  if (!name) {
    errors.name = 'required';
  }

  switch (type) {
    case WIDGET_TYPE_OPPOSITE: {
      const validation = validateOppositeWidget(data);

      errors = { ...errors, ...validation };
    }
  }

  const isValid = Object.values(errors).length === 0;

  return { isValid, errors };
};

const validateOppositeWidget = (data: TWidget): Record<string, string> => {
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

export const validateGoal = (value?: string, required: boolean = true): true|string => {
  if (!value) {
    return !required || 'required';
  }

  const url = new URL(value);

  const isValidOrigin = url.origin === 'https://widgets.donatty.com';
  const isValidPathname = url.pathname === '/goal/';
  const refExists = !!url.searchParams.get('ref');
  const tokenExists = !!url.searchParams.get('token');
  const isValid = isValidOrigin && isValidPathname && refExists && tokenExists;

  if (!isValid) {
    return 'goalLink';
  }

  return true;
};

const colorFormatRegexp = /^#[\dabcdefABCDEF]{6}$/;
const validateColor = (value?: string): true|string => {
  if (!value) {
    return 'required';
  }

  if (!colorFormatRegexp.test(value)) {
    return 'colorFormat';
  }

  return true;
};
