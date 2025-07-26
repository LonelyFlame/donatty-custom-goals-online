import type { CSSProperties } from 'react';

import { FontWrapper } from '@/components/common/Fonts';
import type { TCrowdRepublicVariants } from '@/types/widgets';

import Goal from '../Goal';

import { getId, getData } from './utils';
import styles from './CR.module.scss';

interface Props {
  project: string;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  text?: string;
  font?: string;
  fontSize?: number;
  animationDuration?: number;
  animationFunction?: string;
  variant?: TCrowdRepublicVariants;
}

const CR = async ({
  project,
  color,
  colorSecondary,
  colorTertiary,
  text,
  font,
  fontSize,
  animationDuration,
  animationFunction,
  variant = 'nearest',
}: Props) => {
  const id = getId(project);
  const { value, goal, goals } = await getData(id);

  return (
    <FontWrapper
      className={styles.goal}
      slug={font}
      style={{
        '--color-tertiary': colorTertiary || 'gray',
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        ...(!!animationDuration && { '--animation-duration': `${animationDuration}s` }),
        ...(!!animationFunction && { '--animation-function': animationFunction }),
        ...(!!fontSize && { '--fontSize': `${fontSize}px` }),
      } as CSSProperties}
    >
      <Goal
        id={id}
        initialValue={value}
        goal={goal}
        goals={goals}
        labelTemplate={text}
        variant={variant}
      />
    </FontWrapper>
  );
}

export default CR;
