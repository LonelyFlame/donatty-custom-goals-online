import type { CSSProperties } from 'react';

import { FontWrapper } from '@/components/common/Fonts';

import Goal from '../Goal';

import styles from './BoostyCount.module.scss';

interface Props {
  leverage: number;
  parts: number[];
  color: string;
  colorSecondary: string;
  slug?: string;
  text?: string;
  font?: string;
  fontSize?: number;
  animationDuration?: number;
  animationFunction?: string;
  initialValue?: number;
}

const BoostyCount = async ({
  slug,
  leverage,
  parts,
  color,
  colorSecondary,
  text,
  font,
  fontSize,
  animationDuration,
  animationFunction,
  initialValue,
}: Props) => {
  return (
    <FontWrapper
      className={styles.goal}
      slug={font}
      style={{
        '--color-primary': color || 'gray',
        '--color-secondary': colorSecondary || 'gray',
        ...(!!animationDuration && { '--animation-duration': `${animationDuration}s` }),
        ...(!!animationFunction && { '--animation-function': animationFunction }),
        ...(!!fontSize && { '--fontSize': `${fontSize}px` }),
      } as CSSProperties}
    >
      <Goal
        leverage={leverage}
        slug={slug}
        levelIds={parts}
        labelTemplate={text}
        initialValue={initialValue}
      />
    </FontWrapper>
  );
}

export default BoostyCount;
