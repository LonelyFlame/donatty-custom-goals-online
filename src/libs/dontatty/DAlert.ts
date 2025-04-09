import DWidget from './DWidget';
import { TypeError } from './errors';
import type {
  TDWidgetsResponseAlert,
  TDEventMessageDataAlerts,
  TDAlertMessages,
} from './types/alert';
import type { TDEventMessageData, TDEventMessageProps } from './types/messages';
import type { TDWidgetType } from './types/widget';

class DAlert extends DWidget<TDWidgetsResponseAlert, TDEventMessageDataAlerts> {
  protected verifyWidgetType(type: TDWidgetType) {
    if (type !== 'ALERT') {
      throw new TypeError(type, 'ALERT');
    }

    return true;
  }

  protected processMessage(
    {
      action,
      data,
    }: TDEventMessageProps<TDWidgetsResponseAlert> | TDEventMessageData<TDEventMessageDataAlerts>
  ): TDAlertMessages {
    if (action !== 'DATA') {
      return {
        message: '',
        goal: undefined,
        amount: undefined,
        currency: undefined,
        twitch: undefined,
      };
    }

    if (data.currency === 'TWITCH_BIT') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    // followers
    if (data.currency === undefined) {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    if (data.currency === 'MONTH') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    if (data.currency === 'SUBSCRIPTION') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    if (data.currency === 'TWITCH_POINT') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    if (data.currency === 'LEVEL') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    if (data.currency === 'VIEWER') {
      return {
        goal: data?.goal?.title,
        message: data.message,
        amount: data.amount,
        currency: data.currency,
        twitch: data.twitch,
      };
    }

    // donates
    return {
      goal: data?.goal?.title,
      message: data.message,
      amount: data.amount,
      currency: data.currency,
      twitch: data.twitch,
    };
  }

  public onData(data: TDAlertMessages) {
    console.log(data); // eslint-disable-line no-console
  }
}

export default DAlert;
