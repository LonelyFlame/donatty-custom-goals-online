'use client';

import cn from 'classnames';
import styles from './Circle.module.scss';

interface Props {
  polygon: string;
  isSecondary?: boolean;
  degrees?: number;
}

const Item = ({
  polygon,
  isSecondary,
  degrees = 0,
}: Props) => {

  const transform = [`rotate(${degrees}deg)`];
  if (isSecondary) {
    transform.push('scaleX(-1)');
  }

  return (
    <div
      className={cn('polygon', styles.polygon, { [styles.secondary]: isSecondary })}
      style={{ clipPath: polygon }}
    >
      <div
        className={cn('image', styles.image)}
        style={{ transform: transform.join(' ') }}
      />
    </div>
  )
};

export default Item;
