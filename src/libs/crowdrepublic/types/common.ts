import { TCRLanguage } from './language';

export interface TCRResponse {
  success: boolean;
  selected_region_id: number;
}

export interface TCRText {
  id: number;
  language: TCRLanguage;
}
