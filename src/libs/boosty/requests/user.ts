import { API_SECTIONS } from '../constants';
import type { TBSubscriptionLevelsResponse } from '../types/responses';

import { fetchByProxy } from './common';

export function boostyGetSubscriptionLevels(slug: string): Promise<TBSubscriptionLevelsResponse | null> {
  return fetchByProxy(API_SECTIONS.SUBSCRIPTION_LEVELS, slug);
}
