import type { ColorPickerProps, GetProp } from 'antd';

export type TAntdColorValue = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;
