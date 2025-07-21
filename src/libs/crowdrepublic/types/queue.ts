export interface TReward {
  id: number;
  price: number;
  backers: number;
  copies: number;
  title: string;
  picture: string;
}

export interface TQueueReward extends TReward {
  soldCopies: number;
}
