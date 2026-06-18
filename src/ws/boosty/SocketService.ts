import type { Socket } from 'socket.io';

import { MIN_BY_MLSECS } from '@/constants/datetime';
import type { TBSubscribersCompact } from '@/libs/boosty/types/common';

import { getAllSubscribers } from './requests';
import { calculateCounts } from './utils';
import { TBoostyCache, TData, TSubscriber } from './types';

class BoostySocketService {
  private cache: TBoostyCache = new Map();
  private REFRESH_INTERVAL = 2 * MIN_BY_MLSECS; // 2 mins

  public async addClient(socket: Socket, clientData: TData) {
    const { slug, levelIds, type } = clientData;
    const { BoostyRepository } = await import('../../db/repositories/BoostyRepository.js');
    const secret = await BoostyRepository.getSecretBySlug(slug);

    if (!secret) {
      socket.emit('error', { message: 'Widget not found' });

      return;
    }

    let group = this.cache.get(secret);

    if (!group) {
      group = {
        subscribers: new Map(),
        timerId: null,
        data: null,
      };

      this.cache.set(secret, group);
    }

    const subscriber: TSubscriber = { socket, levelIds, type };

    group.subscribers.set(socket.id, subscriber);

    if (!group.timerId) {
      this.startRefreshTimer(secret);
    }

    const data = group.data;
    if (data !== null) {
      this.notifyCount([subscriber], data);
    }
  }

  public removeClient(socket: Socket) {
    const cacheEntries = this.cache.entries();

    for (const [key, group] of cacheEntries) {
      if (group.subscribers.has(socket.id)) {
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        group.subscribers.delete(socket.id); // some types mismatch. we have no drizzle here

        if (group.subscribers.size === 0) {
          this.stopRefreshTimer(key);

          // eslint-disable-next-line drizzle/enforce-delete-with-where
          this.cache.delete(key); // some types mismatch. we have no drizzle here
        }

        break;
      }
    }
  }

  private startRefreshTimer(secret: string) {
    const cacheEntry = this.cache.get(secret);
    if (cacheEntry?.timerId) {
      return;
    }

    const timerId = setInterval(async () => {
      this.refreshData(secret);
    }, this.REFRESH_INTERVAL);

    if (cacheEntry) {
      cacheEntry.timerId = timerId;
    }

    this.refreshData(secret)
  }

  private stopRefreshTimer(secret: string) {
    const group = this.cache.get(secret);

    if (group?.timerId) {
      clearInterval(group.timerId);
      group.timerId = null;
    }
  }

  private async refreshData(secret: string) {
    const group = this.cache.get(secret);
    if (!group || group.subscribers.size === 0) {
      this.stopRefreshTimer(secret);

      // eslint-disable-next-line drizzle/enforce-delete-with-where
      this.cache.delete(secret); // some types mismatch. we have no drizzle here
      return;
    }

    try {
      const data = await getAllSubscribers(secret);

      if (!data.length) {
        console.warn(`[BoostySocketService] Returned empty list of subscribers for secret`, secret);

        return;
      }

      group.data = data;

      const countSubscribers = Array.from(group.subscribers.values()).filter(({ type }) => type === 'count');
      if (countSubscribers.length) {
        this.notifyCount(countSubscribers, data);
      }

      const listSubscribers = Array.from(group.subscribers.values()).filter(({ type }) => type === 'list');
      if (listSubscribers.length) {
        this.notifyList(listSubscribers, data);
      }
    } catch (error) {
      console.error('[BoostySocketService] Error refreshing data:', error);
    }
  }

  private notifyCount(subscribers: TSubscriber[], data: TBSubscribersCompact[]) {
    const counts = calculateCounts(data);

    subscribers.forEach(({ socket, levelIds }) => {
      let count = 0;
      Object.entries(counts).forEach(([levelId, levelCount]) => {
        if (levelIds?.length && !levelIds.includes(Number(levelId))) {
          return;
        }

        count = count + levelCount;
      })

      socket.emit('boosty:count:update', { count });
    })
  }

  private notifyList(subscribers: TSubscriber[], data: TBSubscribersCompact[]) {
    subscribers.forEach(({ socket, levelIds }) => {
      const list:string[] = [];
      data.forEach(({ name, subscription }) => {
        if (levelIds?.length && !levelIds.includes(Number(subscription.levelId))) {
          return;
        }

        list.push(name);
      })

      socket.emit('boosty:list:update', { list });
    })
  }

  public dispose() {
    for (const [, group] of this.cache.entries()) {
      if (group.timerId) clearInterval(group.timerId);
    }
    this.cache.clear();
  }
}

export const boostySocketService = new BoostySocketService();
