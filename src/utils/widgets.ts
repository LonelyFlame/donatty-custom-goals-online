import { template } from './strings';
import { ROUTES } from '@/constants/routes';

const mapTypeToRoute = {
  goal: ROUTES.GOALS,
  alert: ROUTES.ALERTS,
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
export const getWidgetLink = (slug: string, includeOrigin: boolean, widgetType: 'goal' | 'alert'): string => {
  const route = mapTypeToRoute[widgetType];
  const urn = template(route, { slug });

  if (!includeOrigin) {
    return urn;
  }

  return `${baseUrl}${urn}`;
}
