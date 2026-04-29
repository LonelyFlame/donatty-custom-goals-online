import { API_SECTIONS } from '../constants';

import type {
  TBUserResponse,
  TBSubscriptionLevelsResponse,
  TBSubscriptionsResponse,
  TBSubscribersResponse,
} from './responses';

export interface TBRequestResponseMap {
  [API_SECTIONS.USER]: TBUserResponse,
  [API_SECTIONS.SUBSCRIPTION_LEVELS]: TBSubscriptionLevelsResponse,
  [API_SECTIONS.SUBSCRIPTIONS]: TBSubscriptionsResponse,
  [API_SECTIONS.SUBSCRIBERS]: TBSubscribersResponse,
}

export type TBRequestResponses = keyof TBRequestResponseMap;
