import type { CSSProperties } from 'react';

import { FontWrapper } from '@/components/common/Fonts';

import Queue from '../Queue';

import { getId } from './utils';
import styles from './CRAlert.module.scss';

interface Props {
  project: string;
  delay: number;
  color?: string;
  text: string;
  font?: string;
  fontSize?: number;
  isPreview?: boolean;
}

const CRAlert = async ({
  project,
  text,
  delay,
  font,
  fontSize,
  color,
  isPreview,
}: Props) => {
  const id = getId(project);

  return (
    <FontWrapper
      className={styles.goal}
      slug={font}
      style={{
        '--color-primary': color || 'black',
        ...(!!fontSize && { '--fontSize': `${fontSize}px` }),
      } as CSSProperties}
    >
      <Queue
        id={id}
        text={text}
        delay={delay}
        isPreview={isPreview}
      />
    </FontWrapper>
  );
}

export default CRAlert;
