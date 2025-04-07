import chroma from 'chroma-js';

export interface TValidateColorOptions {
  notTransparent?: boolean;
}
export const validateColor = (
  value?: string,
  options?: TValidateColorOptions,
): boolean => {
  if (!value) return false;

  try {
    const color = chroma(value);

    if (options?.notTransparent && color.alpha() === 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
