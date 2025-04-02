export const validateGoal = (value?: string, required: boolean = true): true|string => {
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

const colorFormatRegexp = /^#[\dabcdefABCDEF]{6}$/;
export const validateColor = (value?: string): true|string => {
  if (!value) {
    return 'required';
  }

  if (!colorFormatRegexp.test(value)) {
    return 'colorFormat';
  }

  return true;
};
