import cn from 'classnames';
import type { CSSProperties } from 'react';

import DGoal from '@/libs/dontatty/DGoal';

import { FontWrapper } from '@/components/common/Fonts';
import { PARTS_DELIMITER } from '@/constants/widgets';

import Goal from './Goal';
import styles from './Multiple.module.scss';

interface Props {
  goal: string;
  goalSecondary: string;
  color: string;
  image?: string;
  leverage: number;
  timer?: number;
  animationDuration?: number;
  animationFunction?: string;
  colorSecondary?: string;
  text?: string;
  font?: string;
  fontSize?: number;
}

const Multiple = async ({
  goal,
  goalSecondary,
  color,
  image,
  leverage,
  timer,
  animationDuration,
  animationFunction,
  colorSecondary,
  text,
  font,
  fontSize,
}: Props) => {
  const goals = goal.split(PARTS_DELIMITER).reduce<string[]>((acc, item) => {
    if (item) {
      acc.push(item);
    }

    return acc;
  }, []);
  const goalsSecondary = goalSecondary.split(PARTS_DELIMITER).reduce<string[]>((acc, item) => {
    if (item) {
      acc.push(item);
    }

    return acc;
  }, []);

  let additionalValue: number = 0;
  for (const item of goalsSecondary) {
    const goal = new DGoal(item);
    goal.onData = ({ raised }) => {
      additionalValue += raised;
    }

    await goal.fetch();
  }

  return (
    <FontWrapper
      slug={font}
      style={{
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        '--image-primary': image ? `url(${image})` : 'none',
        ...(!!fontSize && { '--fontSize': `${fontSize}px` }),
        ...(!!animationDuration && { '--animation-duration': `${animationDuration}s` }),
        ...(!!animationFunction && { '--animation-function': animationFunction }),
      } as CSSProperties}
      className={cn('container', styles.multiple)}
    >
      <Goal
        goals={goals}
        additionalValue={additionalValue}
        leverage={leverage}
        timer={timer}
        text={text}
      />
    </FontWrapper>
  )
};

export default Multiple;
