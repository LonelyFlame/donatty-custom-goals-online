import cn from 'classnames'

import { valueToPercent } from '@/utils/numbers';

import styles from './Parts.module.scss';

interface Props {
  leverage: number;
  value: number;
}

const Part = ({ value, leverage }: Props) => {
  if (!Number.isInteger(value) || value >= leverage) {
    return null;
  }

  const percent = valueToPercent(value, leverage);

  return <div className={cn('part', styles.part)} style={{ left: `${percent}%` }} />;
};

export default Part;
