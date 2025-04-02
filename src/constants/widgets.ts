import {
  BoxPlotFilled,
  ClockCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { ComponentType } from 'react';

import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';

const { widgets: t } = translations;

export const WIDGET_TYPE_OPPOSITE = 'opposite' as const;
export const WIDGET_TYPE_CLOCK = 'clock' as const;
export const WIDGET_TYPE_CIRCLE = 'circle' as const;

export const WIDGET_TYPES = {
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_CIRCLE,
};

export const BUBBLES_COUNT = 30;

export const DEFAULT_CLOCK_IMAGE_URL = '/widgets/clockHand.png';

export const MAP_TYPE_TO_TITLE = {
  [WIDGET_TYPE_OPPOSITE]: t.opposite.title,
  [WIDGET_TYPE_CLOCK]: t.clock.title,
  [WIDGET_TYPE_CIRCLE]: t.circle.title,
} satisfies Record<TWidgetType, string>;

export const MAP_TYPE_TO_ICON_COMPONENT = {
  [WIDGET_TYPE_OPPOSITE]: BoxPlotFilled,
  [WIDGET_TYPE_CLOCK]: ClockCircleOutlined,
  [WIDGET_TYPE_CIRCLE]: PieChartOutlined,
} satisfies Record<TWidgetType, ComponentType>;
