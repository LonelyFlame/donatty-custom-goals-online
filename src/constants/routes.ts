import type { TWidgetType } from '@/types/widgets';

import { WIDGET_TYPE_OPPOSITE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_CIRCLE } from './widgets';

export const ROUTES = {
  HOME: '/',
  COOKIES: '/cookies',

  OPPOSITE: '/opposite/{slug}',
  CLOCK: '/clock/{slug}',
  CIRCLE: '/circle/{slug}',

  WIDGETS_OPPOSITE: '/widgets/opposite/{slug}',
  WIDGETS_CLOCK: '/widgets/clock/{slug}',
  WIDGETS_CIRCLE: '/widgets/circle/{slug}',

  API_WIDGETS: '/api/widgets',
} satisfies Record<string, string>;

export const MAP_TYPE_TO_MANAGE_ROUTE = {
  [WIDGET_TYPE_OPPOSITE]: ROUTES.OPPOSITE,
  [WIDGET_TYPE_CLOCK]: ROUTES.CLOCK,
  [WIDGET_TYPE_CIRCLE]: ROUTES.CIRCLE,
} satisfies Record<TWidgetType, string>;

export const MAP_TYPE_TO_WIDGET_ROUTE = {
  [WIDGET_TYPE_OPPOSITE]: ROUTES.WIDGETS_OPPOSITE,
  [WIDGET_TYPE_CLOCK]: ROUTES.WIDGETS_CLOCK,
  [WIDGET_TYPE_CIRCLE]: ROUTES.WIDGETS_CIRCLE,
} satisfies Record<TWidgetType, string>;
