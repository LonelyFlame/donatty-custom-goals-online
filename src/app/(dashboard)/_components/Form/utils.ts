import { ROUTES } from '@/constants/routes';
import type { TWidgetType } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

export const postSubmit = async (
  { color, colorSecondary, colorTertiary, image, imageSecondary, ...restData }: TWidgetFormData,
  type: TWidgetType,
  slug?: string,
) => {
  const colorValue = typeof color === 'string'
    ? color
    : color?.toHexString();

  const colorSecondaryValue = typeof colorSecondary === 'string'
    ? colorSecondary
    : colorSecondary?.toHexString();

  let colorTertiaryValue: undefined | string;
  if (colorTertiary) {
    colorTertiaryValue = typeof colorTertiary === 'string'
      ? colorTertiary
      : colorTertiary?.toHexString();
  }

  const data = {
    ...restData,
    color: colorValue,
    colorSecondary: colorSecondaryValue,
    colorTertiary: colorTertiaryValue,
    image: image?.at(0)?.url,
    imageSecondary: imageSecondary?.at(0)?.url,
    slug,
    type,
  };

  return fetch(
    ROUTES.API_WIDGETS,
    { method: 'post', body: JSON.stringify(data) },
  );
};
