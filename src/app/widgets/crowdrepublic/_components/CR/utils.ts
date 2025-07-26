import last from 'lodash/last';

import { CRGetGoals, CRGetProject } from '@/libs/crowdrepublic/CRRequest';

import { mapCRGoals } from '@/utils/mappers/cr';

export const getData = async (id: number) => {
  const project = await CRGetProject(id);
  const goalsData = await CRGetGoals(id);
  const goals = mapCRGoals(goalsData);

  const fundingGoal = project.funding_goal
  const fundedSum = project.funded_sum

  return {
    value: fundedSum,
    goal: fundingGoal,
    goals,
  };
};

export const getId = (project: string): number => {
  const { pathname } = new URL(project);
  const parts = pathname.split('/');
  const id = last(parts);

  return Number(id);
};
