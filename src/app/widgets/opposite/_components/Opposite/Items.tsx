'use client';

import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import useGoals from '@/hooks/useGoals';

import Item from './Item';
import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  goal: string;
  goalSecondary?: string;
  leverage?: number;
  liquid?: boolean;
}

const Items = ({ goal, goalSecondary, leverage, liquid, children }: Props) => {
  const percent = useGoals({ goal, goalSecondary, leverage });

  const percentSecondary = percent < 0 ? -percent : 0;
  const percentPrimary = percent > 0 ? percent : 0;

  return (
    <>
      {!!goalSecondary && (
        <Item className={cn('left', styles.left)} percent={percentSecondary} liquid={liquid}>
          {children}
        </Item>
      )}
      <Item className={cn('right', styles.right)} percent={percentPrimary} liquid={liquid}>
        {children}
      </Item>
    </>
  )
};

export default Items;
