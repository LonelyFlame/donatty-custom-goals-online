import { TCRLanguage } from './language';

export type TCRGoalStatus = ''; // TODO: add variants

export interface TCRGoalsResponse {
  Goals: TCRGoal[];
  success: boolean;
  selected_region_id: number;
}

export interface TCRGoal {
  id: number;
  owner_id: number;
  user_id: number;
  status: TCRGoalStatus;
  target_sum: number;
  picture: string;
  picture_id: number;
  time_created: number;
  time_updated: number;
  name: string;
  text: TCRGoalText;
}

export interface TCRGoalText {
  id: number;
  project_goal_id: number;
  language: TCRLanguage;
  name: string;
  short_description: string;
  full_description: string;
}
