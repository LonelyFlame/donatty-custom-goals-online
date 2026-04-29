import type { TCRGoal } from '@/libs/crowdrepublic/types/goal';

import { WIDGET_TYPE_BOOSTY_COUNT } from '@/constants/widgets';
import type { TBoosty as TBoostyEntity } from '@/types/entities';
import type {
  TBoosty,
  TBoosties,
  TWidgetBoostyCount,
  TBoostyType,
} from '@/types/widgets';

export const mapBoostyGoals = (goals: TCRGoal[]) => {
  // eslint-disable-next-line camelcase
  return (goals || []).map(({ id, name, target_sum }) => ({
    id,
    name,
    value: Number(target_sum),
  }));
}

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

  throw new Error('Unexpected widget type?!');
};
