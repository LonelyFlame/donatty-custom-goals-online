import { API_SECTIONS, BASE_URL, PROXY_URI, SECRET_KEY_HEADER } from './constants';
import type { TBRequestResponseMap } from './types/requests';
import type { TBSubscribers } from './types/common';
import type {
  TBSubscribersResponse,
  TBSubscriptionLevelsResponse,
  TBSubscriptionsResponse,
  TBUserResponse,
} from './types/responses';

import { matchUserSubscriptions } from './utils';

export function boostyGetJson<R extends keyof TBRequestResponseMap>(
  secret: string,
  section: R,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R]> {
  const url = new URL(`${BASE_URL}/${section}`);

  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(
    url,
    {
      method: 'GET',
      headers: { [SECRET_KEY_HEADER]: secret },
    },
  ).then((response) => response.json());
}

async function fetchByProxy<R extends keyof TBRequestResponseMap>(
  section: R,
  slug: string,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R] | null> {
  const url = new URL(`${PROXY_URI}/${section}`);

  const query: Record<string, string> = { slug };
  if (params?.limit) {
    query.limit = String(params.limit);
  }
  if (params?.offset) {
    query.offset = String(params.offset);
  }

  url.search = new URLSearchParams(query).toString();

  try {
    const response = await fetch(url);

    return await response.json() as Promise<TBRequestResponseMap[R]>;
  } catch (error) {
    console.error('[fetchByProxy]', error);

    return null;
  }
}

export function boostyGetUser(slug: string): Promise<TBUserResponse | null> {
  return fetchByProxy(API_SECTIONS.USER, slug);
}

export function boostyGetSubscriptionLevels(slug: string): Promise<TBSubscriptionLevelsResponse | null> {
  return fetchByProxy(API_SECTIONS.SUBSCRIPTION_LEVELS, slug);
}

export function boostyGetSubscriptions(slug: string): Promise<TBSubscriptionsResponse | null> {
  return fetchByProxy(API_SECTIONS.SUBSCRIPTIONS, slug);
}

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
