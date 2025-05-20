'use client';

import type { CSSProperties, PropsWithChildren } from 'react';

import { FONTS } from '@/constants/theme';

interface Props extends PropsWithChildren {
  slug?: string;
  className?: string;
  style?: CSSProperties;
}

const FontWrapper = ({ slug, className, style, children }: Props) => {
  const font = FONTS.find((item) => item.slug === slug);

  if(!font) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        ...(!!font && { '--font': font.name }),
        ...style,
      }}
    >
      {children}
      {font && <link href={font.uri} rel="stylesheet" />}
    </div>
  );
};

export default FontWrapper;
