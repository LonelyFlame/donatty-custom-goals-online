import { CSSProperties } from 'react';
import cn from 'classnames';

import styles from './Bubbles.module.scss';

const Bubble = () => {
  const size = Math.random() + 0.3;
  const opacity = 0.6 + (Math.random() * 0.4);
  const position = Math.random() * 100;

  return (
    <div
      style={{
        opacity,
        '--size-bubbles': size,
        left: `${position}vw`,
      } as CSSProperties}
      className={cn('bubble', styles.bubble)}
    />
  );
};

export default Bubble;
