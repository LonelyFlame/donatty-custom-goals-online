import last from 'lodash/last';
import sortBy from 'lodash/sortBy';

import { CRGetGoals, CRGetProject } from '@/libs/crowdrepublic/CRRequest';

import { mapCRGoals } from '@/utils/mappers/cr';

export const getData = async (id: number) => {
  const project = await CRGetProject(id);
  const goalsData = await CRGetGoals(id);
  const goals = mapCRGoals(goalsData);

  const fundingGoal = project.funding_goal
  const fundedSum = project.funded_sum
  const max = last(sortBy([...goals, { value: fundingGoal }], 'value'));

  return {
    value: fundedSum,
    goal: fundingGoal,
    max: max?.value || fundingGoal,
    goals,
  };
};

export const getId = (project: string): number => {
  const { pathname } = new URL(project);
  const parts = pathname.split('/');
  const id = last(parts);

  return Number(id);
};
