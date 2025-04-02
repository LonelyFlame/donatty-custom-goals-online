import { ROUTES } from '@/constants/routes';
import type { TWidgetType } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

export const postSubmit = async (
  { color, colorSecondary, bubblesColor, image, imageSecondary, ...restData }: TWidgetFormData,
  type: TWidgetType,
  slug?: string,
) => {
  const colorValue = typeof color === 'string'
    ? color
    : color?.toHexString();

  const colorSecondaryValue = typeof colorSecondary === 'string'
    ? colorSecondary
    : colorSecondary?.toHexString();

  let bubblesColorValue: string = '#808080';
  if (restData.liquid && bubblesColor) {
    bubblesColorValue = typeof bubblesColor === 'string'
      ? bubblesColor
      : bubblesColor?.toHexString();
  }

  const data = {
    ...restData,
    color: colorValue,
    colorSecondary: colorSecondaryValue,
    bubblesColor: bubblesColorValue,
    image: image?.at(0)?.url,
    imageSecondary: imageSecondary?.at(0)?.url,
    slug,
    type,
  };
//   console.log(data)
// return;
  return fetch(
    ROUTES.API_WIDGETS,
    { method: 'post', body: JSON.stringify(data) },
  );
};
