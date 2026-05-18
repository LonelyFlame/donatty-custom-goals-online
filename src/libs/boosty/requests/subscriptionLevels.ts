import { API_SECTIONS } from '../constants';
import type { TBSubscriptionLevelsResponse } from '../types/responses';

import { fetchByProxy } from './common';

export async function boostyGetSubscriptionLevels(slug?: string, secret?: string): Promise<TBSubscriptionLevelsResponse | null> {
  const response = await fetchByProxy(API_SECTIONS.SUBSCRIPTION_LEVELS, slug, secret);

  if (!response || 'error' in response) {
    return null;
  }

  return response;
}
