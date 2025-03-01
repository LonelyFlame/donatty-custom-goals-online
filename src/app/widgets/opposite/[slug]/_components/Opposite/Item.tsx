'use client';

import type { PropsWithChildren } from 'react';
import cn from 'classnames';

import useGoal from '@/hooks/useGoal';

import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  percent: number;
  color: string;
  liquid?: boolean;
  className?: string;
}

const Item = ({ liquid, color, percent, className, children }: Props) => {
  return (
    <div className={cn('item', className, styles.item, { [styles.liquid]: liquid })}>
      <div
        style={{
          backgroundColor: color,
          transform: `translateX(${percent}%)`,
        }}
        className={cn('fill', styles.fill)}
      >
        {children}
      </div>
    </div>
  )
};

export default Item;
