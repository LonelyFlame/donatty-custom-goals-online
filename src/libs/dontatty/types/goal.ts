import type { TDWidgetsResponseAbstract } from './response';
import type { TDDonattyAccountSource } from './source';
import type { TDStyledBlock, TDStyledBlockTextable, TDStyleShadow } from './style';
import type { TDEventMessage } from './messages';

export interface TDWidgetsResponseGoal extends TDWidgetsResponseAbstract<TDWidgetsDataGoal, TDWidgetsStyleGoal> {
  type: 'GOAL';
}

export interface TDWidgetsDataGoal {
  /**
   * uuidV4
   */
  refId: string;
  /**
   * datetime string: YYYY-MM-DDThh:mm:ss.sssssssssZ
   */
  goalDate: "2025-03-07T19:01:49.901082524Z",

  state: 'COLLECTING';
  goal: number;
  goalFrom: number;
  goalCollected: number;
  headerTemplate: string;

  sources: {
    accounts: {
      donatty: TDDonattyAccountSource;
    };
  };
}

export interface TDWidgetsStyleGoal {
  /**
   * currently available 6 options: 0-5
   */
  layout: number;

  goal: TDStyledBlock;
  countdown: TDStyledBlock;
  progressBar: TDStyledBlockTextable;
  shadow: TDStyleShadow;

  theme: string;
  widgetDateBackground: string;
  widgetIndicatorColor: string;
  widgetBackgroundColor: string;
  widgetDateBackgroundEnabled: true;
  widgetIndicatorColorEnabled: true;
  widgetBackgroundColorEnabled: true

  stroke: {
    width: number;
    color0: string;
    color1: string;
    enabled: boolean;
  };
  dimensions: {
    width: number;
    height: number;
    autoDetect: boolean;
  };
}

export interface TDEventMessageDataGoal {
  raised: number;
}

export type TDEventMessageGoal = TDEventMessage<TDWidgetsResponseGoal, TDEventMessageDataGoal>;

export interface TDGoalMessage {
  goal: number;
  raised: number;
}
