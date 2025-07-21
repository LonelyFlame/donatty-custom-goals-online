import { TFVTTFlags } from './common';

export interface TFVTTSpeaker {
  alias: string;
  scene: string | null;
  actor: string | null;
  token: string | null;
}

export interface TFVTTMessage {
  whisper: string[];
  speaker: TFVTTSpeaker;
  flags: TFVTTFlags;
  content: string;
  _id: string;
  type: 0 | 5;
  user: string;
  timestamp: number;
  flavor: string;
  blind: boolean;
  rolls?: string[];
  emote: boolean;
}
