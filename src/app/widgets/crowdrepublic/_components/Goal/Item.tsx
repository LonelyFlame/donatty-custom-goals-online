'use client';

import { useMemo } from 'react';
import cn from 'classnames';

import styles from './Goal.module.scss';

interface Props {
  value: number;
  max: number;
  className?: string;
}

const Item = ({
  value,
  max,
  className,
}: Props) => {
  const percent = useMemo(() => {
    return (value / max) * 100;
  }, [value, max]);

  return (
    <div
      className={cn(className, styles.item)}
      style={{ left: `${percent}%` }}
    />
  );
};

export default Item;
