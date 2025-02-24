import { WIDGET_TYPES } from '@/constants/widgets';
import type { ValueOf } from '@/types/utils';

export type WidgetTypes = ValueOf<typeof WIDGET_TYPES>;

export interface Widget {
  name?: string;
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
  infinite?: boolean;
}

export interface WidgetOpposite extends Widget {
  goalSecondary: string;
  color: string;
  colorSecondary: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  rotate?: never;
  half?: never;
  liquid?: boolean;
  infinite?: never;
}

export interface WidgetClock extends Widget {
  goalSecondary?: string;
  color: never;
  colorSecondary: never;
  image: string;
  imageSecondary: never;
  leverage?: number;
  rotate?: never;
  half?: boolean;
  liquid?: never;
  infinite?: boolean;
}

export interface WidgetPieChart extends Widget {
  goalSecondary?: string;
  color?: string;
  colorSecondary?: string;
  image?: string;
  imageSecondary?: never;
  leverage?: number;
  rotate?: boolean;
  half?: boolean;
  liquid?: never;
  infinite?: never;
}
