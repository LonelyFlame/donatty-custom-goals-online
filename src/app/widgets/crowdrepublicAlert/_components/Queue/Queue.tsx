'use client';

import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';

import { useRewardsQueue } from '@/libs/crowdrepublic/hooks';

import translations from '@/translations/widgets';

import { getLabel } from './utils';
import { MOVE_QUEUE_FURTHER_DELAY, EMPTY_IMAGE_URI } from './constants';
import styles from './Queue.module.scss';

interface Props {
  id: number;
  delay: number;
  text: string;
  isPreview?: boolean;
}

const { crAlert: t } = translations;

const Queue = ({ id, delay, text, isPreview }: Props) => {
  const timeoutRef = useRef<number | null>(null);

  const [visible, setVisible] = useState(false);

  const { queue, moveFurther } = useRewardsQueue(id);

  const reward = queue.at(0);
  const label = isPreview
    ? getLabel(text, t.previewTitle, 100, 10, 50)
    : getLabel(text, reward?.title, reward?.copies, reward?.soldCopies, reward?.backers);

  const imageURL = !reward?.picture || isPreview ? EMPTY_IMAGE_URI : reward.picture;

  const queueLength = queue.length;
  useEffect(() => {
    if (timeoutRef.current || queueLength === 0) {
      return;
    }

    setVisible(true);

    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;

        moveFurther();
      }, MOVE_QUEUE_FURTHER_DELAY);
    }, delay * 1000);
  }, [queueLength, delay, moveFurther]);

  return (
    <div className={cn('container', styles.container)} style={{ opacity: visible || isPreview ? 1 : 0 }}>
      <div
        className={cn('imageContainer', styles.imageContainer)}
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        <img className={cn('image', styles.image)} src={imageURL} />
      </div>
      <div className={cn('text', styles.text)}>
        {label}
      </div>
    </div>
  );
};

export default Queue;
