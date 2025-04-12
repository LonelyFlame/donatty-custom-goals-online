import { TYPES, WIDGET_TYPES, GOALS_TYPES, ALERTS_TYPES } from '@/constants/widgets';
import type { ValueOf } from '@/types/utils';

export type TType = ValueOf<typeof TYPES>;
export type TWidgetType = ValueOf<typeof WIDGET_TYPES>;
export type TGoalType = ValueOf<typeof GOALS_TYPES>;
export type TAlertType = ValueOf<typeof ALERTS_TYPES>;
export type TWidgets = TWidgetOpposite | TWidgetClock | TWidgetCircle | TWidgetOscilloscope | TWidgetLSS;
export type TGoals = TWidgetOpposite | TWidgetClock | TWidgetCircle | TWidgetOscilloscope;
export type TAlerts = TWidgetLSS;

export interface TWidget {
  slug?: string;
  timer?: number;
  type: TWidgetType;
  name: string;
  color?: string;
  colorSecondary?: string;
  colorTertiary?: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
  liquid?: boolean;
  infinite?: boolean;
  fade?: boolean;
  variant?: string;
  animationDuration?: number;
  animationFunction?: string;
}

export interface TGoal extends TWidget {
  goal: string;
  goalSecondary?: string;
  type: TGoalType;
}

export interface TAlert extends TWidget {
  alert: string;
  type: TAlertType;
  sfx?: boolean;
}

export interface TWidgetOpposite extends TGoal {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_OPPOSITE;
  goalSecondary: string;
  color: string;
  colorSecondary: string;
  leverage?: number;
  liquid?: boolean;
  colorTertiary?: string;
}

export interface TWidgetClock extends TGoal {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CLOCK;
  goalSecondary?: string;
  image: string;
  leverage?: number;
  half?: boolean;
  infinite?: boolean;
}

export interface TWidgetCircle extends TGoal {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CIRCLE;
  goalSecondary?: string;
  image: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
}

export interface TWidgetOscilloscope extends TGoal {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_OSCILLOSCOPE;
  goalSecondary?: string;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  leverage?: number;
  fade?: boolean;
  variant: TOscilloscopeVariants;
}

export interface TWidgetLSS extends TAlert {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_LSS;
  timer: number;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  leverage: number;
  fade?: boolean;
  goals?: string[]
  variant: TOscilloscopeVariants;
  sfx?: boolean;
}

export type TOscilloscopeVariants = 'sin' | 'heart';
