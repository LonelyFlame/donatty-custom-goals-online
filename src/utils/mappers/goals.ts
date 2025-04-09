import {
  WIDGET_TYPE_CIRCLE,
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_OSCILLOSCOPE,
} from '@/constants/widgets';
import type { TGoal as TGoalEntity } from '@/types/entities';
import {
  TGoal,
  TGoals,
  TWidgetOpposite,
  TWidgetClock,
  TWidgetCircle,
  TWidgetOscilloscope,
  TWidgetType,
} from '@/types/widgets';

export const mapGoalToWidget = ({ settings, type, ...data }: TGoalEntity): TGoals => {
  const parsedSettings = JSON.parse(settings) as Omit<TGoal, 'name' | 'type'>;
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
