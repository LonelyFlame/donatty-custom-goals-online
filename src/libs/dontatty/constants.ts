import { TDWidgetType } from './types/widget';

export const API_BASE_URI = 'https://api.donatty.com';
export const BASE_URI = 'https://widgets.donatty.com';

export const PATHNAMES = ['goal', 'events', 'donations'];
export const WIDGET_TYPES: TDWidgetType[] = ['GOAL', 'EVENTS', 'ALERT'];
export const WIDGET_TYPES_TO_PATHNAMES: Record<TDWidgetType, string> = {
  GOAL: 'goal',
  EVENTS: 'events',
  ALERT: 'donations',
};

export const AUTH_RETRY_LIMIT = 5;

export const JWT_REVOKE_INTERVAL = 12 * 60 * 60 * 1000; // usually, Donatty`s jwt expires in a 24hrs, but let's revoke it twice as early to be sure
export const SSE_RECONNECT_INTERVAL = 10 * 60 * 1000;
export const SSE_ERROR_RECONNECT_INTERVAL = 30 * 60 * 1000;

export const MESSAGE_TYPES = {
  DATA: 'DATA',
  PING: 'PING',
  REFRESH: 'REFRESH',
  DELETE: 'DELETE',
};
