import { validateColor } from './colors';

export const goalValidator = (value?: string, required: boolean = true): true|string => {
  if (!value) {
    return !required || 'required';
  }

  const url = new URL(value);

  const isValidOrigin = url.origin === 'https://widgets.donatty.com';
  const isValidPathname = url.pathname === '/goal/';
  const refExists = Boolean(url.searchParams.get('ref'));
  const tokenExists = Boolean(url.searchParams.get('token'));
  const isValid = isValidOrigin && isValidPathname && refExists && tokenExists;

  if (!isValid) {
    return 'goalLink';
  }

  return true;
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
