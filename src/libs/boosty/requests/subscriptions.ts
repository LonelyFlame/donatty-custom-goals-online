import { API_SECTIONS } from '../constants';
import type { TBSubscriptionsResponse } from '../types/responses';

import { fetchByProxy } from './common';

export function boostyGetSubscriptions(slug: string): Promise<TBSubscriptionsResponse | null> {
  return fetchByProxy(API_SECTIONS.SUBSCRIPTIONS, slug);
}
