import { boostyGetJson } from '@/libs/boosty/requests/common';
import { API_SECTIONS, MAX_REQUEST_TRIES } from '@/libs/boosty/constants';
import type { TBSubscribersCompact } from '@/libs/boosty/types/common';
import type { TBErrorResponse, TBSubscribersResponse } from '@/libs/boosty/types/responses';

import { matchUserSubscriptions } from './utils';

function getSubscribers(
  secret: string,
  limit: number = 20,
  offset?: number,
): Promise<TBSubscribersResponse | TBErrorResponse | null> {
  return boostyGetJson(
    secret,
    API_SECTIONS.SUBSCRIBERS,
    {
      // eslint-disable-next-line camelcase
      is_free: String(false),
      limit: String(limit),
      ...(offset && { offset: String(offset) }),
    },
  );
}

export async function getAllSubscribers(
  slug: string,
  limit: number = 100,
): Promise<TBSubscribersCompact[]> {
  const result: TBSubscribersCompact[] = [];

  let offset = 0;
  let keepFetching = true;
  let triesCount = 0;

  while (keepFetching) {
    const response = await getSubscribers(slug, limit, offset)
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

      console.error(`[BoostySocketService] Boosty API are crashed over ${MAX_REQUEST_TRIES} times`);

      return [];
    }

    const { users, subscriptions, extra } = response;

    if (!extra.nextOffset) {
      keepFetching = false;

      break;
    }

    triesCount = 0

    const subscribers = matchUserSubscriptions(users, subscriptions);

    result.push(...subscribers);

    offset = extra.nextOffset;
  }

  return result;
}
