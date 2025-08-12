'use client';

import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  percentPrimary: number;
  percentSecondary?: number;
  liquid?: boolean;
}

const Contestation = ({ percentPrimary, percentSecondary = 0, liquid, children }: Props) => {
  const percent = 0.5 + (percentPrimary / 2) - (percentSecondary / 2);

  return (
    <div className={cn('contestationContainer', styles.contestationContainer)}>
      <div
        className={cn('contestationItem', styles.contestationItem, { [styles.liquid]: liquid })}
        style={{ width: `${percent * 100}%` }}
      />
      {children}
    </div>
  )
};

export default Contestation;
