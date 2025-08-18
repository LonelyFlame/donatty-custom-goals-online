import cn from 'classnames';

import Part from './Part';
import styles from './Parts.module.scss';

interface Props {
  leverage: number;
  parts: number[];
  className?: string;
}

const Parts = ({ leverage, parts, className }: Props) => {
  return (
    <div className={cn('parts', className, styles.container)}>
      {parts.map((value, index) => <Part key={index} value={value} leverage={leverage} />)}
    </div>
  );
};

export default Parts;
