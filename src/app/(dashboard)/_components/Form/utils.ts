import { ROUTES } from '@/constants/routes';
import type { TWidgetType } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

export const postSubmit = async (
  { color, colorSecondary, tertiaryColor, image, imageSecondary, ...restData }: TWidgetFormData,
  type: TWidgetType,
  slug?: string,
) => {
  const colorValue = typeof color === 'string'
    ? color
    : color?.toHexString();

  const colorSecondaryValue = typeof colorSecondary === 'string'
    ? colorSecondary
    : colorSecondary?.toHexString();

  let tertiaryColorValue: undefined | string;
  if (restData.liquid && tertiaryColor) {
    tertiaryColorValue = typeof tertiaryColor === 'string'
      ? tertiaryColor
      : tertiaryColor?.toHexString();
  }

  const data = {
    ...restData,
    color: colorValue,
    colorSecondary: colorSecondaryValue,
    tertiaryColor: tertiaryColorValue,
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
