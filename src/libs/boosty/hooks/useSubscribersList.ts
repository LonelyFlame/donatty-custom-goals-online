import { useCallback } from 'react';

import { boostyGetAllActiveSubscribers, boostyGetActiveSubscribersByLevels } from '../requests/subscribers';
import type { TBSubscribers } from '../types/common';

import { useSync } from './useSync';

export const useSubscribersList = (
  slug: string,
  initialValue: TBSubscribers[],
  levelIds?: number[],
  limit: number = 100,
): TBSubscribers[] => {
  const sync = useCallback(async () => {
    let list: TBSubscribers[];

    if (levelIds?.length) {
      list = await boostyGetActiveSubscribersByLevels(slug, levelIds, limit);
    } else {
      list = await boostyGetAllActiveSubscribers(slug, limit);
    }

    return list;
  }, [levelIds, slug, limit]);

  return useSync<TBSubscribers[]>(sync, initialValue);
};
