export const BASE_URL = 'https://devapi.boosty.to/v1/';

export const API_SECTIONS = {
  USER: 'user' as const,
  SUBSCRIPTION_LEVELS: 'subscription_levels' as const,
  SUBSCRIPTIONS: 'subscriptions' as const,
  SUBSCRIBERS: 'subscribers' as const,
} satisfies Record<string, string>;

export const SECRET_KEY_HEADER = 'X-Api-Key';

export const PROXY_URI = '/api/proxy/boosty';

export const SYNC_DELAY = 2 * 60 * 1000; // 2 min
