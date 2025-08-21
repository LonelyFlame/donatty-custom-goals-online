import { getProjectUri, getProjectGoalsUri, getProjectRewardsUri } from './utils';
import { PROXY_URI } from './constants';
import type { TCRProjectResponse, TCRProject } from './types/project';
import type { TCRGoalsResponse, TCRGoal } from './types/goal';
import type { TCRRewardsResponse, TCRReward } from './types/reward';

export const CRGetJson = <R = TCRProjectResponse | TCRGoalsResponse>(uri: string, useProxy?: boolean): Promise<R> => {
  let target = uri;
  if (useProxy) {
    target = `${PROXY_URI}${encodeURIComponent(target)}`;
  }

  return fetch(target).then((response) => response.json());
}

export const CRGetProject = (id: number, useProxy?: boolean): Promise<TCRProject> => {
  const projectUri = getProjectUri(id);

  return CRGetJson<TCRProjectResponse>(projectUri, useProxy).then(({ Project }: TCRProjectResponse) => Project);
}

export const CRGetGoals = (id: number, useProxy?: boolean): Promise<TCRGoal[]> => {
  const goalsUri = getProjectGoalsUri(id);

  return CRGetJson<TCRGoalsResponse>(goalsUri, useProxy).then(({ Goals }: TCRGoalsResponse) => Goals);
}

export const CRGetRewards = (id: number, useProxy?: boolean): Promise<TCRReward[]> => {
  const rewardsUri = getProjectRewardsUri(id);

  return CRGetJson<TCRRewardsResponse>(rewardsUri, useProxy).then(({ Rewards }: TCRRewardsResponse) => Rewards);
}
