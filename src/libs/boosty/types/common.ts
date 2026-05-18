export interface TBUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  flags: {
    isAuthor: boolean;
    isBanned: boolean;
  };
}

export interface TBUserCompact {
  id: number;
}

export interface TBSubscriptionLevel {
  id: number;
  price: string;
  authorId: number;
  name: string;
  createTime: number;
  isDeleted: boolean;
}

export interface TBSubscription {
  id: number;
  ownerId: number;
  levelId: number;
  startTime: number;
  endTime: number;
  nextPayTime: number;
  subscriberId: number;
  payments: string;
}

export interface TBSubscribers extends TBUser {
  subscription: TBSubscription;
}

export interface TBSubscribersCompact extends TBUserCompact {
  subscription: {
    levelId: number;
  }
}
