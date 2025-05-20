import { CRGetRewards } from './CRRequest';
import { SYNC_DELAY } from './constants';
import type { TCRReward } from './types/reward';

type CRRewardsSyncCallback = (_rewards: TCRReward[]) => void;
export const CRRewardsSync = (id: number, callback: CRRewardsSyncCallback) => {
  const sync = async () => {
    const rewards = await CRGetRewards(id);

    callback(rewards);
  };

  const initTimeout = () => {
    window.setTimeout(() => {
      sync();
      initTimeout();
    }, SYNC_DELAY);
  };
  initTimeout();
};
