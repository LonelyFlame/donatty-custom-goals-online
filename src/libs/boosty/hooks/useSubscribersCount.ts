import { useCallback } from 'react';

import { boostyGetAllActiveSubscribersCount, boostyGetActiveSubscribersCountByLevels } from '../requests/subscribers';

import useSync from './useSync';

const useSubscribersCount = (
  slug: string,
  initialValue: number,
  levelIds?: number[],
  limit: number = 100,
): number => {
  const sync = useCallback(async () => {
    if (!slug) {
      return initialValue || 0;
    }

    let count: number;

    if (levelIds?.length) {
      count = await boostyGetActiveSubscribersCountByLevels(slug, levelIds, limit);
    } else {
      count = await boostyGetAllActiveSubscribersCount(slug, limit);
    }

    return count;
  }, [levelIds, slug, limit, initialValue]);

  return useSync<number>(sync, initialValue);
};

export default useSubscribersCount;
