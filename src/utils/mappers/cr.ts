import type { TCRGoal } from '@/libs/crowdrepublic/types/goal';

import { WIDGET_TYPE_CR, } from '@/constants/widgets';
import type { TCR as TCREntity } from '@/types/entities';
import {
  TCrowdRepublic,
  TCRs,
  TWidgetCR,
  TWidgetType,
} from '@/types/widgets';

export const mapCRGoals = (goals: TCRGoal[]) => {
  // eslint-disable-next-line camelcase
  return (goals || []).map(({ id, name, target_sum }) => ({
    id,
    name,
    value: Number(target_sum),
  }));
}

export const mapCRToWidget = ({ settings, type, ...data }: TCREntity): TCRs => {
  const parsedSettings = JSON.parse(settings) as Omit<TCrowdRepublic, 'name' | 'type'>;
  const mappedData = {
    ...data,
    ...parsedSettings,
    type: type as TWidgetType,
  };

  if (type === WIDGET_TYPE_CR) {
    return mappedData as TWidgetCR;
  }

  throw new Error('Unexpected widget type?!');
};
