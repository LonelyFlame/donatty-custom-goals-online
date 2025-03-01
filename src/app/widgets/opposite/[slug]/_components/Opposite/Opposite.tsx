'use client';

import type { PropsWithChildren } from 'react';
import cn from 'classnames';

import useGoal from '@/hooks/useGoal';

import Item from './Item';
import styles from './Opposite.module.scss';

interface Props extends PropsWithChildren {
  goal: string;
  goalSecondary: string;
  color: string;
  colorSecondary: string;
  leverage?: number;
  liquid?: boolean;
}

const Opposite = ({ goal, goalSecondary, leverage, liquid, color, colorSecondary, children }: Props) => {
  const percent = useGoal({ goal, goalSecondary, leverage });

  const percentLeft = percent > 0 ? (100 - (100 * percent)) : 100;
  const percentRight = percent < 0 ? ((-100 * percent) - 100) : -100;

  return (
    <>
      <Item className={cn('left', styles.left)} percent={percentLeft} color={color} liquid={liquid}>
        {children}
      </Item>
      <Item className={cn('right', styles.right)} percent={percentRight} color={colorSecondary} liquid={liquid}>
        {children}
      </Item>
    </>
  )
};

export default Opposite;
