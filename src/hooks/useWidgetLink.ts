'use client'

import { useMemo, useCallback } from 'react';

import { getWidgetLink } from '@/utils/widgets';

const useWidgetLink = (slug: string) => {
  const link = useMemo(() => {
    return getWidgetLink(slug);
  }, [slug]);

  const copy = useCallback(async (): Promise<void> => {
    if (!navigator) return;

    return await navigator.clipboard.writeText(link);
  }, [link]);

  return { link, copy };
};

export default useWidgetLink;
