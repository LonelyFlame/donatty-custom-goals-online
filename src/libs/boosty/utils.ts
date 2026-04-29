import type { TBSubscription, TBUser, TBSubscribers } from './types/common';

function mapSubscriptionsByUsers(subscriptions: TBSubscription[]): Map<number, TBSubscription> {
  const subscriptionsByUser = new Map<number, TBSubscription>();
  const now = Date.now();

  subscriptions.forEach((subscription) => {
    const { subscriberId, startTime, endTime } = subscription;
    const isActive = startTime <= now && (endTime ===0 || endTime < now);

    if (!isActive) {
      return;
    }

    subscriptionsByUser.set(subscriberId, subscription);
  });

  return subscriptionsByUser;
}

export function matchUserSubscriptions(
  users: TBUser[],
  subscriptions: TBSubscription[],
): TBSubscribers[] {
  const subscriptionsByUser = mapSubscriptionsByUsers(subscriptions);

  return users.reduce<TBSubscribers[]>((acc, user) => {
    const { id } = user;

    const subscription = subscriptionsByUser.get(id);

    if (subscription) {
      acc.push({
        ...user,
        subscription,
      })
    }

    return acc;
  }, []);
}
