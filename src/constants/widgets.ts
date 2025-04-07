import {
  BoxPlotFilled,
  DashboardFilled,
  PieChartFilled,
  FundFilled,
} from '@ant-design/icons';
import { ComponentType } from 'react';

import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';

const { widgets: t } = translations;

export const WIDGET_TYPE_OPPOSITE = 'opposite' as const;
export const WIDGET_TYPE_CLOCK = 'clock' as const;
export const WIDGET_TYPE_CIRCLE = 'circle' as const;
export const WIDGET_TYPE_OSCILLOSCOPE = 'oscilloscope' as const;

export const WIDGET_TYPES = {
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_CIRCLE,
  WIDGET_TYPE_OSCILLOSCOPE,
};

export const BUBBLES_COUNT = 30;

export const DEFAULT_CLOCK_IMAGE_URL = '/widgets/clockHand.png';

export const MAP_TYPE_TO_TITLE = {
  [WIDGET_TYPE_OPPOSITE]: t.opposite.title,
  [WIDGET_TYPE_CLOCK]: t.clock.title,
  [WIDGET_TYPE_CIRCLE]: t.circle.title,
  [WIDGET_TYPE_OSCILLOSCOPE]: t.oscilloscope.title,
} satisfies Record<TWidgetType, string>;

export const MAP_TYPE_TO_ICON_COMPONENT = {
  [WIDGET_TYPE_OPPOSITE]: BoxPlotFilled,
  [WIDGET_TYPE_CLOCK]: DashboardFilled,
  [WIDGET_TYPE_CIRCLE]: PieChartFilled,
  [WIDGET_TYPE_OSCILLOSCOPE]: FundFilled,
} satisfies Record<TWidgetType, ComponentType>;

export const LIQUID_DEFAULT_ANIMATION_DURATION = 3;
export const LIQUID_DEFAULT_ANIMATION_FUNCTION = 'linear(0, 0.038 1.3%, 0.145 2.7%, 0.775 8%, 0.997 10.3%, 1.138 12.6%, 1.18 13.8%, 1.201 15%, 1.206 16.3%, 1.191 17.8%, 1.008 25.8%, 0.974 28.3%, 0.959 30.9%, 0.961 33.8%, 0.998 41.7%, 1.008 46.6%, 0.998 62.2%, 1)';
