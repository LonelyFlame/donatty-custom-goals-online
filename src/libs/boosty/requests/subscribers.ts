import { matchUserSubscriptions } from '../utils';
import { API_SECTIONS, MAX_REQUEST_TRIES } from '../constants';
import type { TBSubscribers, TBSubscribersCompact } from '../types/common';
import { TBErrorResponse, TBSubscribersResponse } from '../types/responses';

import { fetchByProxy } from './common';

export function boostyGetSubscribers(
  slug: string,
  limit: number = 20,
  offset?: number,
): Promise<TBSubscribersResponse | TBErrorResponse | null> {
  return fetchByProxy(
    API_SECTIONS.SUBSCRIBERS,
    slug,
    undefined,
    {
      limit: String(limit),
      offset: String(offset),
    },
  );
}

async function getAllSubscribers<T extends boolean>(
  slug: string,
  limit: number = 20,
  isCompact: T = false as T,
): Promise<(T extends true ? TBSubscribersCompact : TBSubscribers)[]> {
  type TResultValue = T extends true ? TBSubscribersCompact : TBSubscribers;
  const result: TResultValue[] = [];

  let offset = 0;
  let keepFetching = true;
  let triesCount = 0;

  while (keepFetching) {
    const response = await boostyGetSubscribers(slug, limit, offset)
      .catch((error) => {
        console.error('[getAllSubscribers]', { slug, limit, offset }, error);

        return null;
      });

    if (!response || 'error' in response) {
      triesCount += 1;

      if (triesCount <= MAX_REQUEST_TRIES) {
        continue;
      }

      keepFetching = false;

      break;
    }

    const { users, subscriptions, extra } = response;

    if (!extra.nextOffset) {
      keepFetching = false;

      break;
    }

    triesCount = 0

    const subscribers = matchUserSubscriptions(users, subscriptions, isCompact);

    result.push(...(subscribers as TResultValue[]));

    offset = extra.nextOffset;
  }

  return result;
}

export function boostyGetAllActiveSubscribers<T extends boolean>(
  slug: string,
  limit: number = 20,
  isCompact: T = false as T,
): Promise<(T extends true ? TBSubscribersCompact : TBSubscribers)[]> {
  return getAllSubscribers(slug, limit, isCompact);
}

export async function boostyGetActiveSubscribersByLevels<T extends boolean>(
  slug: string,
  levelIds: number[],
  limit: number = 20,
  isCompact: T = false as T,
): Promise<(T extends true ? TBSubscribersCompact : TBSubscribers)[]> {
  type TResultValue = T extends true ? TBSubscribersCompact : TBSubscribers;

  const subscribers = await boostyGetAllActiveSubscribers(slug, limit, isCompact) as TResultValue[];

  return subscribers.filter(({ subscription }) => {
    const { levelId } = subscription;

    return levelIds.includes(levelId);
  });
}

export async function boostyGetAllActiveSubscribersCount(
  slug: string,
  limit: number = 20,
): Promise<number> {
  const subscribers = await boostyGetAllActiveSubscribers(slug, limit, true);

  return subscribers.length;
}

export async function boostyGetActiveSubscribersCountByLevels(
  slug: string,
  levelIds: number[],
  limit: number = 20,
): Promise<number> {
  const subscribers = await boostyGetActiveSubscribersByLevels(slug, levelIds, limit, true);

  return subscribers.length;
}
