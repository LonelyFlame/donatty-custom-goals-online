import { useRef, useState, useEffect, useCallback } from 'react';

import { CRGetRewards } from '../CRRequest';
import { CRRewardsSync } from '../CRRewards';
import { getImageUri } from '../utils';
import type { TCRReward } from '../types/reward';
import type { TReward, TQueueReward } from '../types/queue';

export const useRewardsQueue = (id: number) => {
  const rewardsRef = useRef<Record<string, TReward>>({});
  const [queue, setQueue] = useState<TQueueReward[]>([]);

  const handleSync = (newRewards: TCRReward[]) => {
    const mappedRewards:Record<string, TReward> = {};
    const newQueued:TQueueReward[] = [];
    const rewards = rewardsRef.current;

    newRewards.forEach((reward: TCRReward) => {
      const newReward:TReward = mapTCRReward(reward);
      const { id, copies } = newReward;
      const alias = String(id);

      const oldReward = rewards[alias];
      const soldCopies = copies - (oldReward?.copies || 0);

      mappedRewards[alias] = newReward;

      if (soldCopies <= 0) {
        return;
      }

      newQueued.push({
        ...newReward,
        soldCopies,
      });
    });

    rewardsRef.current = mappedRewards;

    setQueue((current) => {
      return [...current, ...newQueued];
    });
  };

  const init = async () => {
    const rewards = await CRGetRewards(id);

    rewardsRef.current = rewards.reduce<Record<string, TReward>>((acc, reward) => {
      const mappedReward:TReward = mapTCRReward(reward);

      const { id } = mappedReward;
      const alias = String(id);

      return {
        ...acc,
        [alias]: mappedReward,
      };
    }, {});
  };

  const moveFurther = useCallback((size: number = 1) => {
    setQueue((current) => current.slice(size));
  }, []);

  useEffect(() => {
    init();

    CRRewardsSync(id, handleSync);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { queue, moveFurther };
};

const mapTCRReward = ({
  id,
  price,
  backers,
  copies,
  title,
  picture,
}: TCRReward): TReward => {
  return {
    id: Number(id),
    price: Number(price),
    backers: Number(backers),
    copies: Number(copies),
    picture: getImageUri(picture, 'reduce', '-', 500),
    title,
  };
}
