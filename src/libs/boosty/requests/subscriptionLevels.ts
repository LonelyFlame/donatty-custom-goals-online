import { API_SECTIONS } from '../constants';
import type { TBUserResponse } from '../types/responses';

import { fetchByProxy } from './common';

export function boostyGetUser(slug: string): Promise<TBUserResponse | null> {
  return fetchByProxy(API_SECTIONS.USER, slug);
}
