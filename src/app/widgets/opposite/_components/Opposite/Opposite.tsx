import cn from 'classnames';
import type { CSSProperties } from 'react';

import {
  LIQUID_DEFAULT_ANIMATION_DURATION,
  LIQUID_DEFAULT_ANIMATION_FUNCTION,
} from '@/constants/widgets';
import type { TOppositeVariants } from '@/types/widgets';

import Bubbles from '../Boubles';

import Items from './Items';
import styles from './Opposite.module.scss';

interface Props {
  goal: string;
  goalSecondary?: string;
  color: string;
  colorSecondary?: string;
  image?: string;
  imageSecondary?: string;
  leverage?: number;
  liquid?: boolean;
  colorTertiary?: string;
  timer?: number;
  animationDuration?: number;
  animationFunction?: string;
  variant?: TOppositeVariants;
  parts?: (number | string)[];
}

const Opposite = async ({
  goal,
  goalSecondary,
  color,
  colorSecondary,
  image,
  imageSecondary,
  leverage,
  liquid,
  colorTertiary,
  timer,
  animationDuration,
  animationFunction,
  variant,
  parts,
}: Props) => {
  const animationDurationValue = !animationDuration && liquid ? LIQUID_DEFAULT_ANIMATION_DURATION : animationDuration;
  const animationFunctionValue= !animationFunction && liquid ? LIQUID_DEFAULT_ANIMATION_FUNCTION : animationFunction;

  const isOpposite = Boolean(goalSecondary) && variant === 'filling';

  return (
    <div
      style={{
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        '--color-tertiary': colorTertiary || 'gray',
        '--image-primary': image ? `url(${image})` : 'none',
        '--image-secondary': imageSecondary ? `url(${imageSecondary})` : 'none',
        ...(!!animationDurationValue && { '--animation-duration': `${animationDurationValue}s` }),
        ...(!!animationFunctionValue && { '--animation-function': animationFunctionValue }),
      } as CSSProperties}
      className={cn('container', styles.opposite, {[styles.isOpposite]: isOpposite})}
    >
      <Items
        goal={goal}
        goalSecondary={goalSecondary}
        leverage={leverage}
        liquid={liquid}
        timer={timer}
        variant={variant}
        parts={parts?.map(Number)}
      >
        {liquid && <Bubbles />}
      </Items>
    </div>
  )
};

export default Opposite;
