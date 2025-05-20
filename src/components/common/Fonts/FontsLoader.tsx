'use client';

import { FONTS } from '@/constants/theme';

const FontsLoader = () => {
  return FONTS.map(({ slug, uri }) => <link href={uri} key={slug} rel="stylesheet" />);
};

export default FontsLoader;
