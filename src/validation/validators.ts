import { BASE_URI, WIDGET_TYPES_TO_PATHNAMES } from '@/libs/dontatty/constants';
import { TDWidgetType } from '@/libs/dontatty/types/widget';

import { validateColor } from './colors';

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

export const goalLinkValidator = (value?: string, required: boolean = true): true|string => {
  return widgetLinkValidator('GOAL', value, required);
};

export const alertLinkValidator = (value?: string, required: boolean = true): true|string => {
  return widgetLinkValidator('ALERT', value, required);
};

export const colorValidator = (value?: string): true|string => {
  if (!value) {
    return 'required';
  }

  const isValid = validateColor(value);
  if (!isValid) {
    return 'colorFormat';
  }

  return true;
};
