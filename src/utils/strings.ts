const templateRegexp = /\{(\w+)\}/g;
export const template = (
  str: string,
  params: Record<string, string | number | undefined>,
): string => String(str).replace(templateRegexp, (_, key) => String(params[key] || ''));
