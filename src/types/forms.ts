import type { TAntdColorValue } from './inputs';
import type { TWidgetOpposite, TWidget } from './widgets';

export interface TWidgetFormData extends Omit<TWidget, 'type' | 'color' | 'colorSecondary' | 'bubblesColor'> {
  color?: string | TAntdColorValue;
  colorSecondary?: string | TAntdColorValue;
  bubblesColor?: TAntdColorValue;
}

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'type' | 'color' | 'colorSecondary' | 'bubblesColor'> {
  color: string | TAntdColorValue;
  colorSecondary: string | TAntdColorValue;
  bubblesColor?: TAntdColorValue;
}
