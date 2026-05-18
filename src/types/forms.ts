import type { UploadFile } from 'antd';

import type { TAntdColorValue } from './inputs';
import {
  TWidgetOpposite,
  TWidgetClock,
  TWidgetCircle,
  TWidget,
  TWidgetOscilloscope,
  TWidgetMultiple,
} from './widgets';

export interface TWidgetFormData extends Omit<TWidget, 'type' | 'color' | 'colorSecondary' | 'colorTertiary' | 'image' | 'imageSecondary'> {
  color?: string | TAntdColorValue;
  colorSecondary?: string | TAntdColorValue;
  colorTertiary?: TAntdColorValue;
  image?: [UploadFile];
  imageSecondary?: [UploadFile];
}

export interface TWidgetOppositeFormData extends Omit<TWidgetOpposite, 'type' | 'color' | 'colorSecondary' | 'colorTertiary'> {
  color: string | TAntdColorValue;
  colorSecondary: string | TAntdColorValue;
  colorTertiary?: TAntdColorValue;
}

export interface TWidgetClockFormData extends Omit<TWidgetClock, 'type' | 'image'> {
  image: [UploadFile];
}

export interface TWidgetCircleFormData extends Omit<TWidgetCircle, 'type' | 'image' | 'imageSecondary'> {
  image: [UploadFile];
  imageSecondary?: [UploadFile];
}

export interface TWidgetMultipleFormData extends Omit<TWidgetMultiple, 'type' | 'image'> {
  image: [UploadFile];
  text?: string;
}

export interface TWidgetOscilloscopeFormData extends Omit<TWidgetOscilloscope, 'type' | 'color' | 'colorSecondary' | 'colorTertiary'> {
  color: string | TAntdColorValue;
  colorSecondary: string | TAntdColorValue;
  colorTertiary: string | TAntdColorValue;
}
