import maxBy from 'lodash/maxBy';

import { template } from '@/utils/strings';

export interface TGoal {
  id: number;
  name: string;
  value: number;
}

const { format } = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
export const getLabel = (
  labelTemplate: string,
  value: number,
  goal: number,
  goals: TGoal[],
  max: number,
): string => {
  const goalPercentage = Math.round((value / goal) * 100);

  const next = getNextGoal(goal, goals, value);

  const nextValue = next?.value || max;
  const nextPercentage = Math.round((value / nextValue) * 100);

  const maxValue = max;
  const maxPercentage = Math.round((value / maxValue) * 100);

  const variables = {
    amount: format(value),
    goal: format(goal),
    goalPercentage: format(goalPercentage),
    next: format(nextValue),
    nextPercentage: format(nextPercentage),
    nextName: next?.name || max,
    max: format(maxValue),
    maxPercentage: format(maxPercentage),
    maxName: max,
  };

  return template(labelTemplate, variables);
};

export const getNextGoal = (
  goal: number,
  goals: TGoal[],
  value: number,
): TGoal => {
  const mainGoal: TGoal = { value: goal, name: '', id: 0 };
  const allGoals = [mainGoal, ...goals];
  const maxGoal = maxBy(allGoals, 'value')!;

  return allGoals.find(goal => goal.value >= value) || maxGoal;
};
