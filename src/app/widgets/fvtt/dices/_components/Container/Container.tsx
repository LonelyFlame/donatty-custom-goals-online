'use client';

import useFvttRollsQueue from '@/libs/fvtt/hooks/useFvttRollsQueue';
import type { TRoll } from '@/libs/fvtt/types/queue';

import useQueue from '@/hooks/useQueue';

import Data from './Data';

interface Props {
  host: string;
  session: string;
  delay: number;
}

const Container = ({ host, session, delay }: Props) => {
  const { queue, moveFurther } = useFvttRollsQueue(host, session);
  const { visible, item } = useQueue<TRoll>({ queue, moveFurther, delay, moveQueueFurtherDelay: 1 });

  if (!item) return null;

  return (
    <Data
      visible={visible}
      rollValue={item.rollValue}
      rollFlavor={item.rollFlavor}
      rollType={item.rollType}
      rollOption={item.rollOption}
      actorName={item.actorName}
      actorImage={item.actorImage}
      actorRace={item.actorRace}
      actorClass={item.actorClass}
      actorLevel={item.actorLevel}
    />
  );
};

export default Container;
