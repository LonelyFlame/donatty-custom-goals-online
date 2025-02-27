import { ROUTES } from '@/constants/routes';
import type { TWidgetOppositeFormData } from '@/types/forms';

export const postSubmit = async (
  { color, colorSecondary, ...restData }: TWidgetOppositeFormData,
  slug?: string,
) => {
  const colorValue = typeof color === 'string' ? color : color!.toHexString();
  const colorSecondaryValue = typeof colorSecondary === 'string' ? colorSecondary : colorSecondary!.toHexString();

  const data = {
    ...restData,
    color: colorValue,
    colorSecondary: colorSecondaryValue,
    slug,
  };

  return fetch(
    ROUTES.API_WIDGETS,
    { method: 'post', body: JSON.stringify(data) },
  );
};
