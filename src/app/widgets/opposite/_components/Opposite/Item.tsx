import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  percent: number;
  liquid?: boolean;
  className?: string;
}

const Item = ({ liquid, percent, className, children }: Props) => {
  return (
    <div className={cn('item', className, styles.item, { [styles.liquid]: liquid })}>
      <div
        style={{ width: `${percent * 100}%` }}
        className={cn('fill', styles.fill)}
      >
        <div className={cn('image', styles.image)}>
          {children}
        </div>
      </div>
    </div>
  )
};

export default Item;
