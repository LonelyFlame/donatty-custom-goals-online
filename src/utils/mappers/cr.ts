import type { TCRGoal } from '@/libs/crowdrepublic/types/goal';

import { WIDGET_TYPE_CR, WIDGET_TYPE_CRALERT } from '@/constants/widgets';
import type { TCR as TCREntity } from '@/types/entities';
import {
  TCrowdRepublic,
  TCRs,
  TWidgetCR,
  TWidgetCRAlert,
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

  if (type === WIDGET_TYPE_CRALERT) {
    return mappedData as TWidgetCRAlert;
  }

  throw new Error('Unexpected widget type?!');
};
