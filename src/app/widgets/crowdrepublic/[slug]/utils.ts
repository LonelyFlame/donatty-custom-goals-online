import { notFound, redirect } from 'next/navigation';

import CrRepository from '@/db/repositories/CrRepository';
import { mapCRToWidget } from '@/utils/mappers/cr';
import { getWidgetLink } from '@/utils/widgets';
import { WIDGET_TYPE_CR } from '@/constants/widgets';
import type { TWidgetCR } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetCR> => {
  const cr = await CrRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  const data = mapCRToWidget(cr);
  if (data.type !== WIDGET_TYPE_CR) {
    const route = getWidgetLink(slug, false, 'crAlert');

    return redirect(route);
  }

  return data;
};
