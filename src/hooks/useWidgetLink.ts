'use client'

import { useMemo, useCallback } from 'react';

import type { TWidgetType } from '@/types/widgets';
import { getWidgetLink } from '@/utils/widgets';

const useWidgetLink = (type: TWidgetType, slug: string) => {
  const link = useMemo(() => {
    return getWidgetLink(type, slug);
  }, [type, slug]);

  const copy = useCallback(async (): Promise<void> => {
    if (!navigator) return;

    return await navigator.clipboard.writeText(link);
  }, [link]);

  return { link, copy };
};

export default useWidgetLink;
