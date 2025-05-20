import { getProjectUri, getProjectGoalsUri, getProjectRewardsUri } from './utils';
import type { TCRProjectResponse, TCRProject } from './types/project';
import type { TCRGoalsResponse, TCRGoal } from './types/goal';
import type { TCRRewardsResponse, TCRReward } from './types/reward';

const CRGetJson = <R = TCRProjectResponse | TCRGoalsResponse>(uri: string): Promise<R> => {
  return fetch(uri).then((response) => response.json());
}

export const CRGetProject = (id: number): Promise<TCRProject> => {
  const projectUri = getProjectUri(id);

  return CRGetJson<TCRProjectResponse>(projectUri).then(({ Project }: TCRProjectResponse) => Project);
}

export const CRGetGoals = (id: number): Promise<TCRGoal[]> => {
  const goalsUri = getProjectGoalsUri(id);

  return CRGetJson<TCRGoalsResponse>(goalsUri).then(({ Goals }: TCRGoalsResponse) => Goals);
}

export const CRGetRewards = (id: number): Promise<TCRReward[]> => {
  const rewardsUri = getProjectRewardsUri(id);

  return CRGetJson<TCRRewardsResponse>(rewardsUri).then(({ Rewards }: TCRRewardsResponse) => Rewards);
}
