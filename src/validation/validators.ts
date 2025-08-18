import { BASE_URI, WIDGET_TYPES_TO_PATHNAMES } from '@/libs/dontatty/constants';
import { BASE_URI as CR_BASE_URI } from '@/libs/crowdrepublic/constants';
import { TDWidgetType } from '@/libs/dontatty/types/widget';

import { validateColor } from './colors';
import { CR_PROJECT_REGEX } from './constants';
import type { TValidateColorOptions } from './colors';

export const widgetLinkValidator = (
  widgetType: TDWidgetType,
  value?: string,
  required: boolean = true
): true|string => {
  if (!value) {
    return !required || 'required';
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return 'urlFormat';
  }

  const widgetTypePathname = WIDGET_TYPES_TO_PATHNAMES[widgetType];

  const isValidOrigin = url.origin === BASE_URI;
  const isValidPathname = url.pathname === `/${widgetTypePathname}/`;
  const refExists = Boolean(url.searchParams.get('ref'));
  const tokenExists = Boolean(url.searchParams.get('token'));
  const isValid = isValidOrigin && isValidPathname && refExists && tokenExists;

  if (!isValid) {
    return 'widgetLink';
  }

  return true;
};

export const crProjectLinkValidator = (
  value?: string,
  required: boolean = true
): true|string => {
  if (!value) {
    return !required || 'required';
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return 'urlFormat';
  }

  const isValidOrigin = url.origin === CR_BASE_URI;
  const isValidPathname = CR_PROJECT_REGEX.test(url.pathname);
  const isValid = isValidOrigin && isValidPathname;

  if (!isValid) {
    return 'projectLink';
  }

  return true;
};

export const goalLinkValidator = (value?: string, required: boolean = true): true|string => {
  return widgetLinkValidator('GOAL', value, required);
};

export const alertLinkValidator = (value?: string, required: boolean = true): true|string => {
  return widgetLinkValidator('ALERT', value, required);
};

export const colorValidator = (value?: string, options?: TValidateColorOptions): true|string => {
  if (!value) {
    return 'required';
  }

  const isValid = validateColor(value, options);
  if (!isValid) {
    return 'colorFormat';
  }

  return true;
};

export const partsValidator = (parts?: (string | number)[]): boolean => {
  if (!parts) {
    return true;
  }

  return parts?.map(Number).every((part) => Number.isSafeInteger(part));
};
