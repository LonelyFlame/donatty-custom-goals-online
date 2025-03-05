import type { TAntdColorValue } from './inputs';
import type { TWidgetOpposite, TWidget } from './widgets';

export interface TWidgetFormData extends Omit<TWidget, 'type' | 'color' | 'colorSecondary' | 'bubblesColor'> {
  color?: TAntdColorValue;
  colorSecondary?: TAntdColorValue;
  bubblesColor?: TAntdColorValue;
}

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'type' | 'color' | 'colorSecondary' | 'bubblesColor'> {
  color: TAntdColorValue;
  colorSecondary: TAntdColorValue;
  bubblesColor?: TAntdColorValue;
}
