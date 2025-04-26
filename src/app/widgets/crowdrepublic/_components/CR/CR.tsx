import type { CSSProperties } from 'react';

import Goal from '../Goal';

import Item from './Item';
import { getId, getData } from './utils';
import styles from './CR.module.scss';

interface Props {
  project: string;
  color: string;
  colorSecondary: string;
  colorTertiary: string;
  text?: string;
  animationDuration?: number;
  animationFunction?: string;
}

const CR = async ({ project, color, colorSecondary, colorTertiary, text, animationDuration, animationFunction }: Props) => {
  const id = getId(project);
  const { value, max, goal, goals } = await getData(id);

  return (

    <div
      className={styles.goal}
      style={{
        '--color-tertiary': colorTertiary || 'gray',
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        ...(!!animationDuration && { '--animation-duration': `${animationDuration}s` }),
        ...(!!animationFunction && { '--animation-function': animationFunction }),
      } as CSSProperties}
    >
      <Goal id={id} initialValue={value} max={max} goal={goal} goals={goals} labelTemplate={text} />
      {Boolean(goals.length) && (
        <Item value={goal} max={max} />
      )}
      {goals.map(({ id, value }, index) => index < (goals.length - 1) && (
        <Item key={id} value={value} max={max} />
      ))}
    </div>
  );
}

export default CR;
