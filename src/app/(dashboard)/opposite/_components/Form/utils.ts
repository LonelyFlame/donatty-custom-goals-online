import { ROUTES } from '@/constants/routes';
import type { TWidgetOppositeFormData } from '@/types/forms';

export const postSubmit = async (
  { color, colorSecondary, bubblesColor, ...restData }: TWidgetOppositeFormData,
  slug?: string,
) => {
  const colorValue = typeof color === 'string'
    ? color
    : color!.toHexString();
  const colorSecondaryValue = typeof colorSecondary === 'string'
    ? colorSecondary
    : colorSecondary!.toHexString();

  let bubblesColorValue: string = '#808080';
  if (restData.liquid && bubblesColor) {
    bubblesColorValue = typeof bubblesColor === 'string'
      ? bubblesColor
      : bubblesColor!.toHexString();
  }

  const data = {
    ...restData,
    color: colorValue,
    colorSecondary: colorSecondaryValue,
    bubblesColor: bubblesColorValue,
    slug,
  };

  return fetch(
    ROUTES.API_WIDGETS,
    { method: 'post', body: JSON.stringify(data) },
  );
};
