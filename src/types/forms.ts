import type { UploadFile } from 'antd';

import type { TAntdColorValue } from './inputs';
import type { TWidgetOpposite, TWidgetClock, TWidget } from './widgets';

export interface TWidgetFormData extends Omit<TWidget, 'type' | 'color' | 'colorSecondary' | 'bubblesColor' | 'image' | 'imageSecondary'> {
  color?: string | TAntdColorValue;
  colorSecondary?: string | TAntdColorValue;
  bubblesColor?: TAntdColorValue;
  image?: [UploadFile];
  imageSecondary?: [UploadFile];
}

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'type' | 'color' | 'colorSecondary' | 'bubblesColor'> {
  color: string | TAntdColorValue;
  colorSecondary: string | TAntdColorValue;
  bubblesColor?: TAntdColorValue;
}

export interface TWidgetClockFormData extends Omit<TWidgetClock, 'type' | 'image'> {
  image: [UploadFile];
}
