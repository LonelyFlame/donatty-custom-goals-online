import cn from 'classnames';
import type { CSSProperties } from 'react';

import { LIQUID_DEFAULT_ANIMATION_DURATION, LIQUID_DEFAULT_ANIMATION_FUNCTION } from '@/constants/widgets';

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
  colorTertiary?: string;
  timer?: number;
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
  colorTertiary,
  timer,
  animationDuration,
  animationFunction,
}: Props) => {
  const animationDurationValue = !animationDuration && liquid ? LIQUID_DEFAULT_ANIMATION_DURATION : animationDuration;
  const animationFunctionValue= !animationFunction && liquid ? LIQUID_DEFAULT_ANIMATION_FUNCTION : animationFunction;

  return (
    <div
      style={{
        '--color-tertiary': colorTertiary || 'gray',
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        '--animation-duration': `${animationDurationValue}s`,
        '--animation-function': animationFunctionValue,
      } as CSSProperties}
      className={cn('container', styles.opposite)}
    >
      <Items
        goal={goal}
        goalSecondary={goalSecondary}
        leverage={leverage}
        liquid={liquid}
        timer={timer}
      >
        {liquid && <Bubbles />}
      </Items>
    </div>
  )
};

export default Opposite;
