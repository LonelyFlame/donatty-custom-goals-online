import type { Socket } from 'socket.io';

import type { TBSubscribersCompact } from '@/libs/boosty/types/common';

export type TType = 'count' | 'list';

export interface TSubscriber {
  socket: Socket;
  levelIds?: number[];
  type: TType;
}

export interface TClientGroup {
  subscribers: Map<string, TSubscriber>;
  timerId: NodeJS.Timeout | null;
  data: TBSubscribersCompact[] | null;
}

export interface TData {
  slug: string;
  levelIds: number[];
  type: TType;
}

export type TBoostyCache = Map<string, TClientGroup>;
