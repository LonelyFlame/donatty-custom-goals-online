import type { TFVTTAction } from './actions';
import { TFVTTFlags } from './common';
import type { TFVTTInitialData } from './initial';
import type { FVTTRolls } from './roll';

export interface FVTTSocketCallbacks {
  onInit?: (_data: TFVTTInitialData) => void;
  onAction?: (_data: TFVTTAction) => void;
  onRoll?: (_data: FVTTRolls, _flags: TFVTTFlags, _actionActorId: string | null, _userId: string | null) => void;
}
