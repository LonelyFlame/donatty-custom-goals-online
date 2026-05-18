import { useCallback } from 'react';

import { boostyGetAllActiveSubscribers, boostyGetActiveSubscribersByLevels } from '../requests/subscribers';
import type { TBSubscribers } from '../types/common';

import useSync from './useSync';

const useSubscribersList = (
  slug: string,
  initialValue: TBSubscribers[],
  levelIds?: number[],
  limit: number = 100,
): TBSubscribers[] => {
  const sync = useCallback(async () => {
    let list: TBSubscribers[];

    if (levelIds?.length) {
      list = await boostyGetActiveSubscribersByLevels(slug, levelIds, limit, false);
    } else {
      list = await boostyGetAllActiveSubscribers(slug, limit, false);
    }

    return list;
  }, [levelIds, slug, limit]);

  return useSync<TBSubscribers[]>(sync, initialValue);
};

export default useSubscribersList;
