import { TCRResponse, TCRText } from './common';

export type TCRGoalStatus = ''; // TODO: add variants

export interface TCRGoalsResponse extends TCRResponse {
  Goals: TCRGoal[];
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

export interface TCRGoalText extends TCRText {
  project_goal_id: number;
  name: string;
  short_description: string;
  full_description: string;
}
