import type { TWidgetType } from '@/types/widgets';

import { WIDGET_TYPE_OPPOSITE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_CIRCLE, WIDGET_TYPE_OSCILLOSCOPE, WIDGET_TYPE_LSS } from './widgets';

export const ROUTES = {
  HOME: '/',
  COOKIES: '/cookies',
  FAQ: '/faq',

  OPPOSITE: '/goals/opposite/{slug}',
  CLOCK: '/goals/clock/{slug}',
  CIRCLE: '/goals/circle/{slug}',
  OSCILLOSCOPE: '/goals/oscilloscope/{slug}',

  LSS: '/alerts/lss/{slug}',

  GOALS: '/widgets/goals/{slug}',
  WIDGETS_OPPOSITE: '/widgets/opposite/{slug}',
  WIDGETS_CLOCK: '/widgets/clock/{slug}',
  WIDGETS_CIRCLE: '/widgets/circle/{slug}',
  WIDGETS_OSCILLOSCOPE: '/widgets/oscilloscope/{slug}',

  ALERTS: '/widgets/alerts/{slug}',
  WIDGETS_LSS: '/widgets/lss/{slug}',

  API_WIDGETS: '/api/widgets',
  API_ALERTS: '/api/alerts',
  API_IMAGES: '/api/images',
} satisfies Record<string, string>;

export const MAP_TYPE_TO_MANAGE_ROUTE = {
  [WIDGET_TYPE_OPPOSITE]: ROUTES.OPPOSITE,
  [WIDGET_TYPE_CLOCK]: ROUTES.CLOCK,
  [WIDGET_TYPE_CIRCLE]: ROUTES.CIRCLE,
  [WIDGET_TYPE_OSCILLOSCOPE]: ROUTES.OSCILLOSCOPE,
  [WIDGET_TYPE_LSS]: ROUTES.LSS,
} satisfies Record<TWidgetType, string>;

export const MAP_TYPE_TO_WIDGET_ROUTE = {
  [WIDGET_TYPE_OPPOSITE]: ROUTES.WIDGETS_OPPOSITE,
  [WIDGET_TYPE_CLOCK]: ROUTES.WIDGETS_CLOCK,
  [WIDGET_TYPE_CIRCLE]: ROUTES.WIDGETS_CIRCLE,
  [WIDGET_TYPE_OSCILLOSCOPE]: ROUTES.WIDGETS_OSCILLOSCOPE,
  [WIDGET_TYPE_LSS]: ROUTES.WIDGETS_LSS,
} satisfies Record<TWidgetType, string>;
