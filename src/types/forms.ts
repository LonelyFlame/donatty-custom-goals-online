import type { TAntdColorValue } from './inputs';
import type { TWidgetOpposite } from './widgets';

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'color' | 'colorSecondary'> {
  color: TAntdColorValue;
  colorSecondary: TAntdColorValue;
}
