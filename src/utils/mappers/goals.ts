import type { TGoal } from '@/types/entities';
import type { TWidget, TWidgetOpposite, TWidgetClock, TWidgetCircle, TWidgetOscilloscope, TWidgetType } from '@/types/widgets';
import { WIDGET_TYPE_CIRCLE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_OPPOSITE, WIDGET_TYPE_OSCILLOSCOPE } from '@/constants/widgets';

export const mapGoalToWidget = ({ settings, type, ...data }: TGoal): TWidgetOpposite | TWidgetClock | TWidgetCircle | TWidgetOscilloscope => {
  const parsedSettings = JSON.parse(settings) as Omit<TWidget, 'name' | 'type'>;
  const mappedData = {
    ...data,
    ...parsedSettings,
    type: type as TWidgetType,
  };

  if (type === WIDGET_TYPE_OPPOSITE) {
    return mappedData as TWidgetOpposite;
  }

  if (type === WIDGET_TYPE_CLOCK) {
    return mappedData as TWidgetClock;
  }

  if (type === WIDGET_TYPE_CIRCLE) {
    return mappedData as TWidgetCircle;
  }

  if (type === WIDGET_TYPE_OSCILLOSCOPE) {
    return mappedData as TWidgetOscilloscope;
  }

  throw new Error('Unexpected widget type?!');
};
