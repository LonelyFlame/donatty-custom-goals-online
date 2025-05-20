import { TCRResponse, TCRText } from './common';

export type TCRRewardsStatus = ''; // TODO: add variants

export interface TCRRewardsResponse extends TCRResponse {
  Rewards: TCRReward[];
}

export interface TCRReward {
  id: number;
  owner_id: number;
  user_id: number;
  status: TCRRewardsStatus;
  price: number;
  composite_price: number;
  limit: number | null;
  time_created: number;
  time_updated: number;
  delivery_month: number;
  delivery_year: number;
  backers: number;
  approved: number;
  weight: number | null;
  oc_item_id: number | null;
  delivery_required: number;
  picture: string;
  picture_id: number | null;
  is_unique: number;
  group_name: string | null;
  copies: number;
  is_addon: number;
  priority: number;
  unique_limit: number | null;
  delivery_deferred: number;
  is_second_chance: number;
  is_composite: number;
  time_payment_deadline: string | null;
  parent_reward_id: number | null;
  is_installment_plan: number;
  title: string;
  text: TCRRewardText;
  children: null
}

export interface TCRRewardText extends TCRText {
  project_reward_id: number;
  title: string;
  description: string;
  overview: string;
}
