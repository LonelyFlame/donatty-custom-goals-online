import { WIDGET_TYPE_OPPOSITE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_CIRCLE } from '../../../constants/widgets';
import { ROUTES } from '../../../constants/routes';
import type { WidgetTypes } from '../../../types/widgets';

export const MAP_TYPE_TO_ROUTE = {
  [WIDGET_TYPE_OPPOSITE]: ROUTES.WIDGETS_OPPOSITE,
  [WIDGET_TYPE_CLOCK]: ROUTES.WIDGETS_CLOCK,
  [WIDGET_TYPE_CIRCLE]: ROUTES.WIDGETS_CIRCLE,
} satisfies Record<WidgetTypes, string>;
