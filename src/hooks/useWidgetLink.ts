'use client'

import { useMemo, useCallback } from 'react';

import { getWidgetLink } from '@/utils/widgets';
import type { TType } from '@/types/widgets';

const useWidgetLink = (slug: string, type: TType) => {
  const link = useMemo(() => {
    return getWidgetLink(slug, true, type);
  }, [slug, type]);

  const copy = useCallback(async (): Promise<void> => {
    if (!navigator) return;

    return await navigator.clipboard.writeText(link);
  }, [link]);

  return { link, copy };
};

export default useWidgetLink;
