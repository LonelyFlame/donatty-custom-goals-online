import {
  TDAlertMessageBits,
  TDAlertMessageDonate,
  TDAlertMessageGiftChannel,
  TDAlertMessageGiftViewer,
  TDAlertMessageHypeTrain,
  TDAlertMessagePoints,
  TDAlertMessageRaid,
  TDAlertMessageSubscribe,
} from '@/libs/dontatty/types/alert';

export interface TUseGoals {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  infinite?: boolean;
}

export type TUseAlertData = TDAlertMessageDonate
  | TDAlertMessageBits
  | TDAlertMessageSubscribe
  | TDAlertMessageGiftViewer
  | TDAlertMessageGiftChannel
  | TDAlertMessagePoints
  | TDAlertMessageHypeTrain
  | TDAlertMessageRaid;
export type TOnData = (_data: TUseAlertData) => void;
