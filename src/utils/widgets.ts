import { template } from './strings';
import { ROUTES } from '@/constants/routes';
import type { TType } from '@/types/widgets';

const mapTypeToRoute = {
  goal: ROUTES.GOALS,
  alert: ROUTES.ALERTS,
  cr: ROUTES.WIDGETS_CR,
  crAlert: ROUTES.WIDGETS_CR_ALERT,
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;
export const getWidgetLink = (slug: string, includeOrigin: boolean, widgetType: TType): string => {
  const route = mapTypeToRoute[widgetType];
  const urn = template(route, { slug });

  if (!includeOrigin) {
    return urn;
  }

  return `${baseUrl}${urn}`;
}
