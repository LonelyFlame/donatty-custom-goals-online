import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import { template } from '@/utils/strings';

const { format } = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
export const getLabel = (
  labelTemplate: string,
  value: number,
  goal: number,
  goals: {
    name: string;
    value: number;
  }[],
): string => {
  const allGoals = [...goals, { value: goal, name: '' }];

  const goalPercentage = Math.round((value / goal) * 100);

  const max = maxBy(allGoals, 'value')!;

  const greater = allGoals.filter(goal => goal.value > value);
  const next = minBy(greater, 'value');

  const nextValue = next?.value || max.value;
  const nextPercentage = Math.round((value / nextValue) * 100);

  const maxValue = max.value;
  const maxPercentage = Math.round((value / maxValue) * 100);

  const variables = {
    amount: format(value),
    goal: format(goal),
    goalPercentage: format(goalPercentage),
    next: format(nextValue),
    nextPercentage: format(nextPercentage),
    nextName: next?.name || max.name,
    max: format(maxValue),
    maxPercentage: format(maxPercentage),
    maxName: max.name,
  };

  return template(labelTemplate, variables);
};
