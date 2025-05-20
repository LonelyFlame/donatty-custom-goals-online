import { TCRResponse } from './common';

export type TCRProjectCategory = 'RPG'; // TODO: add variants

export type TCRProjectStatus = 'CHN'; // TODO: add variants

export interface TCRProjectResponse extends TCRResponse {
  Project: TCRProject;
}

export interface TCRProject {
  id: number;
  funding_goal: number;
  funded_sum: number;
  backers_count: number;
  creator_id: number;
  category_1: TCRProjectCategory;
  category_2: string;
  picture: string;
  picture_id: number;
  thumbnail: string;
  thumbnail_id: number;
  video: string;
  comment_thread_id: number;
  status: TCRProjectStatus;
  time_status: number;
  preview_code: string;
  public: boolean;
  feedback_thread_id: number;
  time_launch: number;
  preview_code_prev: string;
  news_thread_id: number;
  time_finish: number;
  time_second_chance: number;
  funded_sum_second_chance: number;
  is_preorder: boolean;
  is_delivery_project: boolean;
  delivery_price: number;
  is_side_pictures: boolean;
  picture_left: string;
  picture_right: string;
  is_second_chance_requested: boolean;
  is_adult: boolean;
  slug: string;
  title: string;
  description: string;
  overview: null; // TODO: fill
  constructor: string;
  creator: TCRCreator;
}

export interface TCRCreator {
  id: number;
  name: string;
  about: string;
  country: null; // TODO: fill
  city: null; // TODO: fill
  skills_description: null; // TODO: fill
  picture_id: number;
  picture: string;
  birthday: null; // TODO: fill
  sex: null; // TODO: fill
  timezone: number;
  phone: null; // TODO: fill
  nforum_subscriptions: number;
  nforum_quotes: number;
  nforum_pm: number;
  nforum_bans: number;
  is_subscriber_news: number;
  acknowledgments_name: string;
}
