import { matchUserSubscriptions } from '../utils';
import { API_SECTIONS } from '../constants';
import type { TBSubscribers } from '../types/common';
import type { TBSubscribersResponse } from '../types/responses';

import { fetchByProxy } from './common';

export function boostyGetSubscribers(slug: string, limit: number = 20, offset?: number): Promise<TBSubscribersResponse | null> {
  return fetchByProxy(
    API_SECTIONS.SUBSCRIBERS,
    slug,
    {
      limit: String(limit),
      offset: String(offset),
    },
  );
}

async function getAllSubscribers (slug: string, limit: number = 20): Promise<TBSubscribers[]> {
  const users: TBSubscribers[] = [];

  let offset = 0;
  let keepFetching = true;

  while (keepFetching) {
    await boostyGetSubscribers(slug, limit, offset)
      .then((response) => {
        if (!response || !response.extra.nextOffset) {
          keepFetching = false;

          return;
        }

        const { users, subscriptions } = response;

        const subscribers = matchUserSubscriptions(users, subscriptions);

        users.push(...subscribers);
      })
      .catch((error) => {
        console.error('[getAllSubscribers]', { slug, limit, offset }, error);

        keepFetching = false;
      });
  }

  return users;
}

export function boostyGetAllActiveSubscribers(slug: string, limit: number = 20): Promise<TBSubscribers[]> {
  return getAllSubscribers(slug, limit);
}

export async function boostyGetActiveSubscribersByLevels(slug: string, levelIds: number[], limit: number = 20): Promise<TBSubscribers[]> {
  const subscribers = await boostyGetAllActiveSubscribers(slug, limit);

  return subscribers.filter(({ subscription }) => {
    const { levelId } = subscription;

    return levelIds.includes(levelId);
  });
}

export async function boostyGetAllActiveSubscribersCount(slug: string, limit: number = 20): Promise<number> {
  const subscribers = await boostyGetAllActiveSubscribers(slug, limit);

  return subscribers.length;
}

export async function boostyGetActiveSubscribersCountByLevels(slug: string, levelIds: number[], limit: number = 20): Promise<number> {
  const subscribers = await boostyGetActiveSubscribersByLevels(slug, levelIds, limit);

  return subscribers.length;
}
