import { WIDGET_TYPE_DYING, WIDGET_TYPE_LSS } from '@/constants/widgets';
import type { TAlert as TAlertEntity } from '@/types/entities';
import {
  TAlert,
  TAlerts,
  TWidgetDying,
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

  if (type === WIDGET_TYPE_DYING) {
    return mappedData as TWidgetDying;
  }

  throw new Error('Unexpected widget type?!');
};
