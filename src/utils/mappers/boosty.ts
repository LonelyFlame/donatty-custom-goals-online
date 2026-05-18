import { WIDGET_TYPE_BOOSTY_COUNT, WIDGET_TYPE_BOOSTY_LIST } from '@/constants/widgets';
import type { TBoosty as TBoostyEntity } from '@/types/entities';
import type {
  TBoosty,
  TBoosties,
  TWidgetBoostyCount,
  TWidgetBoostyList,
  TBoostyType,
} from '@/types/widgets';

export const mapBoostyToWidget = ({ settings, type, ...data }: TBoostyEntity): TBoosties => {
  const parsedSettings = JSON.parse(settings) as Omit<TBoosty, 'name' | 'type'>;
  const mappedData = {
    ...data,
    ...parsedSettings,
    type: type as TBoostyType,
  };

  if (type === WIDGET_TYPE_BOOSTY_COUNT) {
    return mappedData as TWidgetBoostyCount;
  }

  if (type === WIDGET_TYPE_BOOSTY_LIST) {
    return mappedData as TWidgetBoostyList;
  }

  throw new Error('Unexpected widget type?!');
};
