import { TYPES, WIDGET_TYPES, GOALS_TYPES, ALERTS_TYPES, CR_TYPES, BOOSTY_TYPES } from '@/constants/widgets';
import type { ValueOf } from '@/types/utils';

import type { TAlertCompact, TCRCompact, TGoalCompact, TBoostyCompact } from './entities';

export type TOppositeVariants = 'filling' | 'contestation';
export type TOscilloscopeVariants = 'sin' | 'heart';
export type TCrowdRepublicVariants = 'nearest' | 'main' | 'full';
export type TBoostyListVariants = 'row' | 'column';

export type TEntitiesCompact = TGoalCompact | TAlertCompact | TCRCompact | TBoostyCompact;

export type TType = ValueOf<typeof TYPES>;
export type TWidgetType = ValueOf<typeof WIDGET_TYPES>;
export type TGoalType = ValueOf<typeof GOALS_TYPES>;
export type TAlertType = ValueOf<typeof ALERTS_TYPES>;
export type TCRType = ValueOf<typeof CR_TYPES>;
export type TBoostyType = ValueOf<typeof BOOSTY_TYPES>;
export type TWidgets =
  TWidgetMultiple
  | TWidgetOpposite
  | TWidgetClock
  | TWidgetCircle
  | TWidgetOscilloscope
  | TWidgetLSS
  | TWidgetCR
  | TWidgetCRAlert
  | TWidgetBoostyCount;
export type TGoals = TWidgetOpposite | TWidgetClock | TWidgetCircle | TWidgetOscilloscope | TWidgetMultiple;
export type TAlerts = TWidgetLSS | TWidgetDying;
export type TCRs = TWidgetCR | TWidgetCRAlert;
export type TBoosties = TWidgetBoostyCount | TWidgetBoostyList;

export interface TWidget {
  slug?: string;
  timer?: number;
  type: TWidgetType;
  name: string;
  font?: string;
  fontSize?: number;
  color?: string;
  colorSecondary?: string;
  colorTertiary?: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  leverageSecondary?: number;
  rotate?: boolean;
  half?: boolean;
  liquid?: boolean;
  infinite?: boolean;
  fade?: boolean;
  variant?: string;
  parts?: (number | string)[];
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

export interface TCrowdRepublic extends TWidget {
  project: string;
  type: TCRType;
  color?: string;
  colorSecondary?: string;
  colorTertiary?: string;
  text?: string;
  delay?: number;
  animationDuration?: number;
  animationFunction?: string;
}

export interface TBoosty extends TWidget {
  secret: string;
  type: TBoostyType;
  parts: number[];
  leverage?: number;
  color: string;
  colorSecondary?: string;
  colorTertiary?: string;
  text?: string;
  delay?: number;
  animationDuration?: number;
  animationFunction?: string;
  columnGap?: number;
  rowGap?: number;
}

export interface TWidgetOpposite extends TGoal {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_OPPOSITE;
  color: string;
  colorSecondary?: string;
  image: string;
  imageSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  colorTertiary?: string;
  variant?: TOppositeVariants;
  parts?: (number | string)[];
}

export interface TWidgetMultiple extends TGoal {
  goalSecondary: string;
  type: typeof WIDGET_TYPES.WIDGET_TYPE_MULTIPLE;
  color: string;
  colorSecondary?: string;
  image: string;
  leverage: number;
  text?: string;
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

export interface TWidgetDying extends TAlert {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_DYING;
  timer: number;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  leverage: number;
  leverageSecondary: number;
  fade?: boolean;
  goals?: string[]
  variant: TOscilloscopeVariants;
  sfx?: boolean;
}

export interface TWidgetCR extends TCrowdRepublic {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CR;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  text?: string;
  animationDuration?: number;
  animationFunction?: string;
  variant: TCrowdRepublicVariants;
}

export interface TWidgetCRAlert extends TCrowdRepublic {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CRALERT;
  text: string;
  delay: number;
  color: string;
}

export interface TWidgetBoostyCount extends TBoosty {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_BOOSTY_COUNT;
  leverage: number;
  colorSecondary: string;
  text?: string;
  animationDuration?: number;
  animationFunction?: string;
}

export interface TWidgetBoostyList extends TBoosty {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_BOOSTY_LIST;
  text: string;
  fontSize: number;
  variant: TBoostyListVariants;
  columnGap: number;
  rowGap: number;
}
