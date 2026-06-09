import type { TBSubscribersCompact, TBSubscription, TBUser } from '@/libs/boosty/types/common';

export function matchUserSubscriptions(users: TBUser[], subscriptions: TBSubscription[]): TBSubscribersCompact[] {
  const result: TBSubscribersCompact[] = [];
  const subscriptionsByUser = mapSubscriptionsByUsers(subscriptions);

  users.forEach((user) => {
    const { id, name } = user;

    const subscription = subscriptionsByUser.get(id);

    if (!subscription) {
      return;
    }

    result.push({ id, name, subscription: { levelId: subscription } });
  }, []);

  return result;
}

function mapSubscriptionsByUsers(subscriptions: TBSubscription[]): Map<number, number> {
  const subscriptionsByUser = new Map<number, number>();
  const now = Date.now();

  subscriptions.forEach((subscription) => {
    const { subscriberId, startTime, endTime } = subscription;

    // const isActive = startTime <= now && (!endTime || endTime * 1000 > now); // all users with active subscriptions atm.
    const isActive = startTime <= now && !endTime; // as on Boosty, only users with enabled auto-renewal

    if (!isActive) {
      return;
    }

    subscriptionsByUser.set(subscriberId, subscription.levelId);
  });

  return subscriptionsByUser;
}

export function calculateCounts(data: TBSubscribersCompact[]) {
  const counts: Record<number, number> = {};
  data.forEach((subscriber) => {
    const levelId = subscriber.subscription.levelId;

    const levelCount = counts[levelId] || 0;

    counts[levelId] = levelCount + 1;
  });

  return counts;
}
