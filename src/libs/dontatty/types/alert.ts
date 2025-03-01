import type { TDWidgetsResponseAbstract } from './response';
import type { TDDonattyAccountSource, TDTwitchAccountSource } from './source';
import type { TDStyledBlockTextable } from './style';
import type { TDEventMessage } from './messages';

export interface TDWidgetsResponseAlert extends TDWidgetsResponseAbstract<TDWidgetsDataAlert, TDWidgetsStyleAlert> {
  type: 'ALERT';
}

export interface TDWidgetsDataAlert {
  switchDurationMin: number;
  showDurationSeconds: number;
  audioVolume: number;
  filters: {
    emoji: boolean;
    links: boolean;
    profanity: {
      custom: boolean;
      automatic: boolean;
    }
  },
  sources: {
    accounts: {
      donatty: TDDonattyAccountSource;
    } & Record<string, TDTwitchAccountSource | object>;
  };
  speechSynthesis: {
    speed: number;
    enable: boolean;
    voices: number[];
    volume: number;
    sequence: 'AFTER' | 'BEFORE' | 'SIMULTANEOUSLY';
    template: string;
  },
}

export interface TDWidgetsStyleAlert {
  /**
   * currently available 5 options: 0-4
   */
  layout: number;

  header: TDStyledBlockTextable;
  message: TDStyledBlockTextable;

  image: {
    scale: number;
    offsetX: number;
    offsetY: number;
    transparency: number;
  };
  dimensions: {
    width: number;
    height: number;
    autoDetect: boolean;
  }
}

export interface TDEventMessageDataAlert {
  subscriber: string;
  message: string;
  amount: number;
  currency: string;
  goal: {
    title: string;
  };
  mute: {
    audio: boolean;
    voice: boolean;
  };
}

export type TDEventMessageAlert = TDEventMessage<TDWidgetsResponseAlert, TDEventMessageDataAlert>;
