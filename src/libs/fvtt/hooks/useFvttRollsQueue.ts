import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import useFVTTSocket from './useFVTTSocket';
import type {
  FVTTRolls,
  FVTTSocketCallbacks, TFVTTAction,
  TFVTTActor,
  TFVTTFlags,
  TFVTTInitialData,
  TRoll,
  TRollFlags,
} from '../types';

const useFvttRollsQueue = (host: string, session: string) => {
  const [queue, setQueue] = useState<TRoll[]>([]);

  const actorsRef = useRef<TFVTTActor[]>([]);
  const tokensToActorsRef = useRef<Record<string, string>>({});

  const handleRoll = useCallback((rollData: FVTTRolls, flags: TFVTTFlags, actorId: string | null) => {
    const { type, skillId, abilityId }: TRollFlags = flags.dnd5e?.roll || {};

    const actorData = getActorData(actorsRef.current, actorId, host);

    const roll:TRoll = {
      rollValue: rollData.total,
      rollType: type,
      rollOption: skillId || abilityId,
      rollFlavor: rollData.options.flavor,
      actorName: actorData?.name,
      actorImage: actorData?.image,
      actorRace: clearBrackets(actorData?.race?.name),
      actorLevel: actorData?.level,
      actorClass: clearBrackets(actorData?.class?.name),
    };

    setQueue((prevQueue) => {
      return [ ...prevQueue, roll ];
    })
  }, [host]);

  const handleInit = useCallback((data: TFVTTInitialData) => {
    if (!data?.actors?.length) {
      return;
    }

    const { actors } = data;

    actorsRef.current = actors;
    if (typeof window !== 'undefined') {
      localStorage.setItem('actors', JSON.stringify(actors));
    }
  }, []);

  const handleAction = useCallback((data: TFVTTAction) => {
    if (data[0] !== 'modifyDocument') {
      return;
    }

    const monksTokenbarData: Record<string, any> = data?.[1]?.result?.[0]?.flags?.['monks-tokenbar'];
    if (!monksTokenbarData) {
      return;
    }

    const rolls = Object.entries(monksTokenbarData).reduce<TRoll[]>((acc, [key, value]) => {
      const isToken = key.startsWith('token');

      if (!isToken) {
        return acc;
      }

      let actorId = value?.actorid;
      if (!tokensToActorsRef.current[key]) {
        tokensToActorsRef.current[key] = actorId ;
      }

      const rollData = value?.roll;

      if (!rollData) {
        return acc;
      }

      actorId = tokensToActorsRef.current[key];
      const actorData = getActorData(actorsRef.current, actorId, host);

      const rollRequest = value?.request;
      const roll:TRoll = {
        rollValue: rollData.total,
        rollType: rollRequest?.type,
        rollOption: rollRequest?.key,
        rollFlavor: rollData.options.flavor,
        actorName: actorData?.name,
        actorImage: actorData?.image,
        actorRace: clearBrackets(actorData?.race?.name),
        actorLevel: actorData?.level,
        actorClass: clearBrackets(actorData?.class?.name),
      };

      return [...acc, roll];
    }, []);

    setQueue((prevQueue) => {
      return [ ...prevQueue, ...rolls ];
    })
  }, [host]);

  const callbacks: FVTTSocketCallbacks = useMemo(() => {
    return {
      onInit: handleInit,
      onRoll: handleRoll,
      onAction: handleAction,
    }
  }, [handleRoll, handleInit, handleAction]);

  useFVTTSocket(host, session, callbacks);

  const moveFurther = useCallback((size: number = 1) => {
    setQueue((current) => current.slice(size));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedData = localStorage.getItem('actors');
    if (storedData) {
      actorsRef.current = JSON.parse(storedData);
    }
  }, []);

  return { queue, moveFurther };
}

const clearBrackets = (value?: string): string | undefined => {
  if (!value) {
    return value;
  }

  return value.replace(/\(.*\)/ig, '').trim();
};

const getActorData = (actors:TFVTTActor[], actorId: string | null, host: string) => {
  const actor = actors.find(({ _id}) => _id === actorId);

  if (!actor) {
    return null;
  }

  const actorClass = actor?.items?.find(({ type }) => type === 'class');
  const actorRace = actor?.items?.find(({ type }) => type === 'race');

  let actorLevel = 0;
  actor?.items?.forEach((data) => {
    const { type, system } = data;

    if (type === 'class') {
      actorLevel = actorLevel + system.levels;
    }
  });

  let image = actor?.img;
  if (image) {
    image = image?.startsWith('http') ? image : `http://${host}/${image}`;
  }

  return {
    name: actor.name,
    class: actorClass,
    race: actorRace,
    level: actorLevel,
    image,
  };
};

export default useFvttRollsQueue;



