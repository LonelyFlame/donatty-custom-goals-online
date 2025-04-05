import cn from 'classnames';
import type { CSSProperties } from 'react';

import Bubbles from '../Boubles';

import Items from './Items';
import styles from './Opposite.module.scss';

interface Props {
  goal: string;
  goalSecondary?: string;
  color: string;
  colorSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  tertiaryColor?: string;
  delay?: number;
  animationDuration?: number;
  animationFunction?: string;
}

const Opposite = async ({
  goal,
  goalSecondary,
  color,
  colorSecondary,
  leverage,
  liquid,
  tertiaryColor,
  delay,
  animationDuration,
  animationFunction,
}: Props) => {
  return (
    <div
      style={{
        '--color-tertiary': tertiaryColor || 'gray',
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        '--animation-duration': `${animationDuration}s`,
        '--animation-function': animationFunction,
      } as CSSProperties}
      className={cn('container', styles.opposite)}
    >
      <Items
        goal={goal}
        goalSecondary={goalSecondary}
        leverage={leverage}
        liquid={liquid}
        delay={delay}
      >
        {liquid && <Bubbles />}
      </Items>
    </div>
  )
};

export default Opposite;
