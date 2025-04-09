import { template } from './strings';
import { ROUTES } from '@/constants/routes';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
export const getWidgetLink = (slug: string, includeOrigin: boolean = true): string => {
  const route = template(ROUTES.GOALS, { slug });

  if (!includeOrigin) {
    return route;
  }

  return `${baseUrl}${route}`;
}
