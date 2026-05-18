import { API_SECTIONS } from '../constants';
import type { TBSubscriptionsResponse } from '../types/responses';

import { fetchByProxy } from './common';

export async function boostyGetSubscriptions(slug: string): Promise<TBSubscriptionsResponse | null> {
  const response = await fetchByProxy(API_SECTIONS.SUBSCRIPTIONS, slug);

  if (!response || 'error' in response) {
    return null;
  }

  return response;
}
