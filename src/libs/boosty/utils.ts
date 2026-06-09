import type { TBSubscription, TBUser, TBSubscribers, TBSubscribersCompact } from './types/common';

function mapSubscriptionsByUsers<T extends boolean>(
  subscriptions: TBSubscription[],
  isCompact: T = false as T,
): Map<number, T extends true ? number : TBSubscription> {
  type TResultValue = T extends true ? number : TBSubscription;

  const subscriptionsByUser = new Map<number, TResultValue>();
  const now = Date.now();

  subscriptions.forEach((subscription) => {
    const { subscriberId, startTime, endTime } = subscription;

    // const isActive = startTime <= now && (!endTime || endTime * 1000 > now); // all users with active subscriptions atm.
    const isActive = startTime <= now && !endTime; // as on Boosty, only users with enabled auto-renewal

    if (!isActive) {
      return;
    }

    if (isCompact) {
      subscriptionsByUser.set(subscriberId, subscription.levelId as TResultValue);
    } else {
      subscriptionsByUser.set(subscriberId, subscription as TResultValue);
    }
  });

  return subscriptionsByUser;
}

export function matchUserSubscriptions<T extends boolean>(
  users: TBUser[],
  subscriptions: TBSubscription[],
  isCompact: T = false as T,
): (T extends true ? TBSubscribersCompact : TBSubscribers)[] {
  type TResultValue = T extends true ? TBSubscribersCompact : TBSubscribers;
  type TSubscriptionValue = T extends true ? number : TBSubscription

  const result: TResultValue[] = [];
  const subscriptionsByUser = mapSubscriptionsByUsers(subscriptions, isCompact);

  users.forEach((user) => {
    const { id, name } = user;

    const subscription = subscriptionsByUser.get(id) as TSubscriptionValue;

    if (!subscription) {
      return;
    }

    if (isCompact) {
      result.push({ id, name, subscription: { levelId: subscription } } as TResultValue);
    } else {
      result.push({ ...user, subscription } as TResultValue);
    }
  }, []);

  return result;
}
