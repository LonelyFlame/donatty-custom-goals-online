import type { TDWidgetsResponseAbstract } from './response';

export interface TDEventMessageAbstract<Data extends any> {
  action: 'PING' | 'DATA' | 'REFRESH' | 'INIT' | 'DELETE';
  data: Data;
}
export interface TDEventMessagePing extends TDEventMessageAbstract<undefined> {
  action: 'PING';
}
export interface TDEventMessageDelete extends TDEventMessageAbstract<undefined> {
  action: 'DELETE';
}
export interface TDEventMessageProps<Response extends TDWidgetsResponseAbstract<object, object>>
  extends TDEventMessageAbstract<{ props: Response['props'] }> {
  action: 'REFRESH' | 'INIT';
}
export interface TDEventMessageData<Data> extends TDEventMessageAbstract<Data> {
  action: 'DATA';
}

export type TDEventMessage<Response extends TDWidgetsResponseAbstract<object, object>, Data extends any> =
  TDEventMessagePing
  | TDEventMessageDelete
  | TDEventMessageProps<Response>
  | TDEventMessageData<Data>;
