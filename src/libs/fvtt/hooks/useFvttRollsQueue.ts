import { useCallback, useMemo, useRef, useState } from 'react';

import useFVTTSocket from './useFVTTSocket';
import {
  FVTTRolls,
  FVTTSocketCallbacks,
  TFVTTActor,
  TFVTTFlags,
  TFVTTInitialData,
  TRoll,
  TRollFlags,
} from '../types';

const useFvttRollsQueue = (host: string, session: string) => {
  const [queue, setQueue] = useState<TRoll[]>([]);

  const actorsRef = useRef<TFVTTActor[]>([]);

  const handleRoll = useCallback((rollData: FVTTRolls, flags: TFVTTFlags, actorId: string | null) => {
    if (rollData.class !== 'D20Roll') {
      // return;
    }

    const actor = actorsRef.current.find(({ _id}) => _id === actorId);

    const actorClass = actor?.items?.find(({ type }) => type === 'class');
    const actorRace = actor?.items?.find(({ type }) => type === 'race');

    let actorLevel = 0;
    actor?.items?.forEach((data) => {
      const { type, system } = data;

      if (type === 'class') {
        actorLevel = actorLevel + system.levels;
      }
    });

    const { type, skillId, abilityId }: TRollFlags = flags.dnd5e?.roll || {};

    let image = actor?.img;
    if (image) {
      image = image?.startsWith('http') ? image : `http://${host}/${image}`;
    }

    const roll:TRoll = {
      rollValue: rollData.total,
      rollType: type,
      rollOption: skillId || abilityId,
      rollFlavor: rollData.options.flavor,
      actorName: actor?.name,
      actorImage: image,
      actorRace: clearBrackets(actorRace?.name),
      actorLevel: actorLevel,
      actorClass: clearBrackets(actorClass?.name),
    };

    setQueue((prevQueue) => {
      return [ ...prevQueue, roll ];
    })
  }, [host]);

  const handleInit = useCallback((data: TFVTTInitialData) => {
    actorsRef.current = data.actors;
  }, []);

  const callbacks: FVTTSocketCallbacks = useMemo(() => {
    return {
      onInit: handleInit,
      onRoll: handleRoll,
    }
  }, [handleRoll, handleInit]);

  useFVTTSocket(host, session, callbacks);

  const moveFurther = useCallback((size: number = 1) => {
    setQueue((current) => current.slice(size));
  }, []);

  return { queue, moveFurther };
}

const clearBrackets = (value?: string): string | undefined => {
  if (!value) {
    return value;
  }

  return value.replace(/\(.*\)/ig, '').trim();
};

export default useFvttRollsQueue;
