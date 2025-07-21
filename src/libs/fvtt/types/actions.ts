import { TFVTTMessage } from './message';

export interface TFVTTSessionData {
  sessionId: string;
  userId: string;
}

export type TFVTTSession = [
  'session',
  TFVTTSessionData,
];

export interface TFVTTUserActivityData {
  cursor?: {
    x: number;
    y: number;
  };
  sceneId?: string;
  active?: boolean;
}

export type TFVTTUserActivity = [
  'userActivity',
  userId: string,
  TFVTTUserActivityData
];

export interface TFVTTModifyDocumentData {
  request: {
    type: 'ChatMessage' | 'User' | 'Actor' | 'ActorDelta' | 'Token'; // TODO
    action: 'create' | 'update'; // TODO
    data: TFVTTMessage[];
    options: {
      diff?: boolean;
      temporary?: false,
      renderSheet?: false,
      render?: true,
      rollMode?: 'publicroll'; // TODO
    };
  },
  result: TFVTTMessage[],
  userId: string;
}

export type TFVTTModifyDocument = [
  'modifyDocument',
  TFVTTModifyDocumentData,
];

export type TFVTTAction = TFVTTSession | TFVTTUserActivity | TFVTTModifyDocument;
