import { template } from './strings';
import { MAP_TYPE_TO_WIDGET_ROUTE } from '@/constants/routes';
import type { TWidgetType } from '@/types/widgets';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
export const getWidgetLink = (type: TWidgetType, slug: string, includeOrigin: boolean = true): string => {
  const route = template(MAP_TYPE_TO_WIDGET_ROUTE[type], { slug });

  if (!includeOrigin) {
    return route;
  }

  return `${baseUrl}${route}`;
}
