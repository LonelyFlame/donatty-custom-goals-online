import type { UploadFile } from 'antd';

import type { TAntdColorValue } from './inputs';
import type { TWidgetOpposite, TWidgetClock, TWidgetCircle, TWidget } from './widgets';

export interface TWidgetFormData extends Omit<TWidget, 'type' | 'color' | 'colorSecondary' | 'tertiaryColor' | 'image' | 'imageSecondary'> {
  color?: string | TAntdColorValue;
  colorSecondary?: string | TAntdColorValue;
  tertiaryColor?: TAntdColorValue;
  image?: [UploadFile];
  imageSecondary?: [UploadFile];
}

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'type' | 'color' | 'colorSecondary' | 'tertiaryColor'> {
  color: string | TAntdColorValue;
  colorSecondary: string | TAntdColorValue;
  tertiaryColor?: TAntdColorValue;
}

export interface TWidgetClockFormData extends Omit<TWidgetClock, 'type' | 'image'> {
  image: [UploadFile];
}

export interface TWidgetCircleFormData extends Omit<TWidgetCircle, 'type' | 'image' | 'imageSecondary'> {
  image: [UploadFile];
  imageSecondary?: [UploadFile];
}
