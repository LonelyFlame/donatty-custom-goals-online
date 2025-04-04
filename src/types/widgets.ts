import { WIDGET_TYPES } from '@/constants/widgets';
import type { ValueOf } from '@/types/utils';

export type TWidgetType = ValueOf<typeof WIDGET_TYPES>;
export type TWidgets = TWidgetOpposite | TWidgetClock | TWidgetCircle;

export interface TWidget {
  slug?: string;
  delay?: number;
  type: TWidgetType;
  name: string;
  goal: string;
  goalSecondary?: string;
  color?: string;
  colorSecondary?: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
  liquid?: boolean;
  tertiaryColor?: string;
  infinite?: boolean;
  animationDuration?: number;
  animationFunction?: string;
}

export interface TWidgetOpposite extends TWidget {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_OPPOSITE;
  goalSecondary: string;
  color: string;
  colorSecondary: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  tertiaryColor?: string;
}

export interface TWidgetClock extends TWidget {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CLOCK;
  goalSecondary?: string;
  image: string;
  leverage?: number;
  half?: boolean;
  infinite?: boolean;
}

export interface TWidgetCircle extends TWidget {
  type: typeof WIDGET_TYPES.WIDGET_TYPE_CIRCLE;
  goalSecondary?: string;
  image: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
}
