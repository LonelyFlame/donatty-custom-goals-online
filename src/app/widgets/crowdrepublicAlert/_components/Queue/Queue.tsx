'use client';

import cn from 'classnames';

import { useRewardsQueue } from '@/libs/crowdrepublic/hooks';
import type { TQueueReward } from '@/libs/crowdrepublic/types/queue';

import useQueue from '@/hooks/useQueue';
import translations from '@/translations/widgets';

import { getLabel } from './utils';
import { EMPTY_IMAGE_URI } from './constants';
import styles from './Queue.module.scss';

interface Props {
  id: number;
  delay: number;
  text: string;
  isPreview?: boolean;
}

const { crAlert: t } = translations;

const Queue = ({ id, delay, text, isPreview }: Props) => {
  const { queue, moveFurther } = useRewardsQueue(id);
  const { visible, item: reward } = useQueue<TQueueReward>({ queue, moveFurther, delay });

  const label = isPreview
    ? getLabel(text, t.previewTitle, 100, 10, 50)
    : getLabel(text, reward?.title, reward?.copies, reward?.soldCopies, reward?.backers);

  const imageURL = !reward?.picture || isPreview ? EMPTY_IMAGE_URI : reward.picture;

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
