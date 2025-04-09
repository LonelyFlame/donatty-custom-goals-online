import {
  WIDGET_TYPE_LSS,
} from '@/constants/widgets';
import type { TAlert as TAlertEntity } from '@/types/entities';
import {
  TAlert,
  TAlerts,
  TWidgetLSS,
  TWidgetType,
} from '@/types/widgets';

export const mapAlertToWidget = ({ settings, type, ...data }: TAlertEntity): TAlerts => {
  const parsedSettings = JSON.parse(settings) as Omit<TAlert, 'name' | 'type'>;
  const mappedData = {
    ...data,
    ...parsedSettings,
    type: type as TWidgetType,
  };

  if (type === WIDGET_TYPE_LSS) {
    return mappedData as TWidgetLSS;
  }

  throw new Error('Unexpected widget type?!');
};
