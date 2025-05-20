import {
  BoxPlotFilled,
  DashboardFilled,
  PieChartFilled,
  FundFilled,
  HeartFilled,
  ProjectFilled,
  StarFilled,
} from '@ant-design/icons';
import { ComponentType } from 'react';

import translations from '@/translations';
import { TType, TWidgetType } from '@/types/widgets';

const { widgets: t } = translations;

export const TYPE_GOAL = 'goal' as const;
export const TYPE_ALERT = 'alert' as const;
export const TYPE_CR = 'cr' as const;
export const TYPE_CR_ALERT = 'crAlert' as const;

export const TYPES = {
  TYPE_GOAL,
  TYPE_ALERT,
  TYPE_CR,
  TYPE_CR_ALERT,
};

export const WIDGET_TYPE_OPPOSITE = 'opposite' as const;
export const WIDGET_TYPE_CLOCK = 'clock' as const;
export const WIDGET_TYPE_CIRCLE = 'circle' as const;
export const WIDGET_TYPE_OSCILLOSCOPE = 'oscilloscope' as const;
export const WIDGET_TYPE_LSS = 'lss' as const;
export const WIDGET_TYPE_CR = 'cr' as const;
export const WIDGET_TYPE_CRALERT = 'crAlert' as const;

export const WIDGET_TYPES = {
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_CIRCLE,
  WIDGET_TYPE_OSCILLOSCOPE,
  WIDGET_TYPE_LSS,
  WIDGET_TYPE_CR,
  WIDGET_TYPE_CRALERT,
};

export const GOALS_TYPES = {
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_CIRCLE,
  WIDGET_TYPE_OSCILLOSCOPE,
};

export const ALERTS_TYPES = {
  WIDGET_TYPE_LSS,
};

export const CR_TYPES = {
  WIDGET_TYPE_CR,
  WIDGET_TYPE_CRALERT,
};

export const BUBBLES_COUNT = 30;

export const DEFAULT_CLOCK_IMAGE_URL = '/images/clockHand.png';
export const BEEP_SFX_URL = '/audio/beep.mp3';
export const DEATH_SFX_URL = '/audio/death.mp4';

export const MAP_WIDGET_TYPE_TO_TITLE = {
  [WIDGET_TYPE_OPPOSITE]: t.opposite.title,
  [WIDGET_TYPE_CLOCK]: t.clock.title,
  [WIDGET_TYPE_CIRCLE]: t.circle.title,
  [WIDGET_TYPE_OSCILLOSCOPE]: t.oscilloscope.title,
  [WIDGET_TYPE_LSS]: t.lss.title,
  [WIDGET_TYPE_CR]: t.cr.title,
  [WIDGET_TYPE_CRALERT]: t.crAlert.title,
} satisfies Record<TWidgetType, string>;

export const MAP_WIDGET_TYPE_TO_ICON_COMPONENT = {
  [WIDGET_TYPE_OPPOSITE]: BoxPlotFilled,
  [WIDGET_TYPE_CLOCK]: DashboardFilled,
  [WIDGET_TYPE_CIRCLE]: PieChartFilled,
  [WIDGET_TYPE_OSCILLOSCOPE]: FundFilled,
  [WIDGET_TYPE_LSS]: HeartFilled,
  [WIDGET_TYPE_CR]: ProjectFilled,
  [WIDGET_TYPE_CRALERT]: StarFilled,
} satisfies Record<TWidgetType, ComponentType>;

export const MAP_WIDGET_TYPE_TO_TYPE: Record<TWidgetType, TType> = {
  [WIDGET_TYPE_OPPOSITE]: 'goal',
  [WIDGET_TYPE_CLOCK]: 'goal',
  [WIDGET_TYPE_CIRCLE]: 'goal',
  [WIDGET_TYPE_OSCILLOSCOPE]: 'goal',
  [WIDGET_TYPE_LSS]: 'alert',
  [WIDGET_TYPE_CR]: 'cr',
  [WIDGET_TYPE_CRALERT]: 'cr',
};

export const LIQUID_DEFAULT_ANIMATION_DURATION = 3;
export const LIQUID_DEFAULT_ANIMATION_FUNCTION = 'linear(0, 0.038 1.3%, 0.145 2.7%, 0.775 8%, 0.997 10.3%, 1.138 12.6%, 1.18 13.8%, 1.201 15%, 1.206 16.3%, 1.191 17.8%, 1.008 25.8%, 0.974 28.3%, 0.959 30.9%, 0.961 33.8%, 0.998 41.7%, 1.008 46.6%, 0.998 62.2%, 1)';
