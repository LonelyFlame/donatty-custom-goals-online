import { TFVTTFlags, TFVTTStats } from './common';

export interface TFVTTUser {
  name: string;
  role: number;
  _id: string;
  character: string | null;
  color: string;
  pronouns: string;
  hotbar: Record<number, string>;
  permissions: {}; // TODO
  flags: TFVTTFlags;
  _stats: TFVTTStats;
}
