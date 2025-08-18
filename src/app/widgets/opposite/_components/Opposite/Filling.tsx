'use client';

import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import Item from './Item';
import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  isOpposite?: boolean;
  percentPrimary: number;
  percentSecondary?: number;
  liquid?: boolean;
}

const Filling = ({ isOpposite, percentPrimary, percentSecondary, liquid, children }: Props) => {
  return (
    <>
      {isOpposite && (
        <Item className={cn('left', styles.left)} percent={percentSecondary || 0} liquid={liquid}>
          {children}
        </Item>
      )}
      <Item className={cn('right', styles.right)} percent={percentPrimary} liquid={liquid}>
        {children}
      </Item>
    </>
  )
};

export default Filling;
