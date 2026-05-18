import type { TBSubscriptionLevel, TBUser, TBSubscription } from './common';

export interface TBUserResponse {
  user: TBUser;
}

export interface TBSubscriptionLevelsResponse {
  subscriptionLevels: TBSubscriptionLevel[];
}

export interface TBSubscriptionsResponse {
  subscriptions: TBSubscription[];
  subscriptionLevels: TBSubscriptionLevel[];
}

export interface TBSubscribersResponse {
  users: TBUser[];
  subscriptions: TBSubscription[];
  extra: {
    nextOffset: number;
  }
}

export interface TBErrorResponse {
  error: string;
  error_description: string;
}
