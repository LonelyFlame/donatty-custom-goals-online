import cn from 'classnames';
import { CSSProperties } from 'react';

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
  bubblesColor?: string;
}

const Opposite = async ({ goal, goalSecondary, color, colorSecondary, leverage, liquid, bubblesColor }: Props) => {
  return (
    <div
      style={{
        '--color-bubbles': bubblesColor || 'gray',
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
      } as CSSProperties}
      className={cn('container', styles.opposite)}
    >
      <Items
        goal={goal}
        goalSecondary={goalSecondary}
        leverage={leverage}
        liquid={liquid}
      >
        {liquid && <Bubbles />}
      </Items>
    </div>
  )
};

export default Opposite;
