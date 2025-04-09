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
      twitch?: TDTwitchAccountSource;
    };
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
  amount?: number;
  currency?: TDCurrency;
  goal: {
    title: string;
  };
  mute: {
    audio: boolean;
    voice: boolean;
  };
  twitch?: TDEventMessageTwitchData;
}

export interface TDEventMessageTwitchData {
  subscription?: {
    streak?: number;
    total?: number;
    subscriber?: string;
    giftedTo?: string;
    tier: number;
  };
  rewards?: {
    rewardId: string;
    rewardName: string;
    subscriber: string;
    message: string;
    value: number;
  };
  hypeTrain?: {
    level: number;
  };
}

export type TDEventMessageDataAlerts = TDEventMessageDataAlertDonate
  | TDEventMessageDataAlertBits
  | TDEventMessageDataAlertFollow
  | TDEventMessageDataAlertSubscribe
  | TDEventMessageDataAlertGiftViewer
  | TDEventMessageDataAlertGiftChannel
  | TDEventMessageDataAlertPoints
  | TDEventMessageDataAlertHypeTrain
  | TDEventMessageDataAlertRaid;

export type TDEventMessageAlert = TDEventMessage<TDWidgetsResponseAlert, TDEventMessageDataAlerts>;

export type TDCurrencyMoney = 'RUB' | 'USD' | 'EUR'; // TODO: Extend list
export type TDCurrencyTwitch = 'TWITCH_BIT' | 'MONTH' | 'SUBSCRIPTION' | 'TWITCH_POINT' | 'LEVEL' | 'VIEWER';
export type TDCurrency = TDCurrencyMoney | TDCurrencyTwitch;


// export interface TDEventMessageDataAlertDonate extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageDonate {}
// export interface TDEventMessageDataAlertBits extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageBits {}
// export interface TDEventMessageDataAlertFollow extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageFollow {}
// export interface TDEventMessageDataAlertSubscribe extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageSubscribe {}
// export interface TDEventMessageDataAlertGiftViewer extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageGiftViewer {}
// export interface TDEventMessageDataAlertGiftChannel extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageGiftChannel {}
// export interface TDEventMessageDataAlertPoints extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessagePoints {}
// export interface TDEventMessageDataAlertHypeTrain extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageHypeTrain {}
// export interface TDEventMessageDataAlertRaid extends Omit<TDEventMessageDataAlert, 'amount' | 'currency' | 'twitch'>, TDAlertMessageRaid {}

export interface TDEventMessageDataAlertDonate extends TDEventMessageDataAlert {
  amount: number;
  currency: TDCurrencyMoney;
  twitch: undefined;
}
export interface TDEventMessageDataAlertBits extends TDEventMessageDataAlert {
  amount: number;
  currency: 'TWITCH_BIT';
  twitch: {};
}
export interface TDEventMessageDataAlertFollow extends TDEventMessageDataAlert {
  amount: undefined;
  currency: undefined;
  twitch: {};
}
export interface TDEventMessageDataAlertSubscribe extends TDEventMessageDataAlert {
  amount: number;
  currency: 'MONTH';
  twitch: {
    subscription: {
      streak: number;
      total: number;
      tier: number;
      subscriber: undefined;
      giftedTo: undefined;
    }
  };
}
export interface TDEventMessageDataAlertGiftViewer extends TDEventMessageDataAlert {
  amount: number;
  currency: 'MONTH';
  twitch: {
    subscription: {
      subscriber: string;
      giftedTo: string;
      tier: number;
      streak: undefined;
      total: undefined;
    }
  };
}
export interface TDEventMessageDataAlertGiftChannel extends TDEventMessageDataAlert {
  amount: number;
  currency: 'SUBSCRIPTION';
  twitch: {
    subscription: {
      streak: number;
      total: number;
      tier: number;
      subscriber: undefined;
      giftedTo: undefined;
    }
  };
}
export interface TDEventMessageDataAlertPoints extends TDEventMessageDataAlert {
  amount: number;
  currency: 'TWITCH_POINT';
  twitch: {
    rewards: {
      rewardId: string;
      rewardName: string;
      subscriber: string;
      message: string;
      value: number;
    };
  };
}
export interface TDEventMessageDataAlertHypeTrain extends TDEventMessageDataAlert {
  amount: number;
  currency: 'LEVEL';
  twitch: {
    hypeTrain: {
      level: number;
    };
  };
}
export interface TDEventMessageDataAlertRaid extends TDEventMessageDataAlert {
  amount: number;
  currency: 'VIEWER';
  twitch: {};
}

interface TDAlertMessage {
  amount?: number;
  currency?: TDCurrency;
  twitch?: TDEventMessageTwitchData
}
export interface TDAlertMessageDonate extends TDAlertMessage {
  amount: number;
  currency: TDCurrencyMoney;
  twitch: undefined;
}
export interface TDAlertMessageBits extends TDAlertMessage {
  amount: number;
  currency: 'TWITCH_BIT';
  twitch: {};
}
export interface TDAlertMessageFollow extends TDAlertMessage {
  amount: undefined;
  currency: undefined;
  twitch: {};
}
export interface TDAlertMessageSubscribe extends TDAlertMessage {
  amount: number;
  currency: 'MONTH';
  twitch: {
    subscription: {
      streak: number;
      total: number;
      tier: number;
      subscriber: undefined;
      giftedTo: undefined;
    }
  };
}
export interface TDAlertMessageGiftViewer extends TDAlertMessage {
  amount: number;
  currency: 'MONTH';
  twitch: {
    subscription: {
      subscriber: string;
      giftedTo: string;
      tier: number;
      streak: undefined;
      total: undefined;
    }
  };
}
export interface TDAlertMessageGiftChannel extends TDAlertMessage {
  amount: number;
  currency: 'SUBSCRIPTION';
  twitch: {
    subscription: {
      streak: number;
      total: number;
      tier: number;
      subscriber: undefined;
      giftedTo: undefined;
    }
  };
}
export interface TDAlertMessagePoints extends TDAlertMessage {
  amount: number;
  currency: 'TWITCH_POINT';
  twitch: {
    rewards: {
      rewardId: string;
      rewardName: string;
      subscriber: string;
      message: string;
      value: number;
    };
  };
}
export interface TDAlertMessageHypeTrain extends TDAlertMessage {
  amount: number;
  currency: 'LEVEL';
  twitch: {
    hypeTrain: {
      level: number;
    };
  };
}
export interface TDAlertMessageRaid extends TDAlertMessage {
  amount: number;
  currency: 'VIEWER';
  twitch: {};
}

export interface TDAlertMessageEmpty {
  amount: undefined;
  currency: undefined;
  twitch: undefined;
}
export type TDAlertMessageFilled = TDAlertMessageDonate
  | TDAlertMessageBits
  | TDAlertMessageFollow
  | TDAlertMessageSubscribe
  | TDAlertMessageGiftViewer
  | TDAlertMessageGiftChannel
  | TDAlertMessagePoints
  | TDAlertMessageHypeTrain
  | TDAlertMessageRaid;
export type TDAlertMessages = TDAlertMessageEmpty | TDAlertMessageFilled;
