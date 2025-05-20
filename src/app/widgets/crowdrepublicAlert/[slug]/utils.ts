import { notFound, redirect } from 'next/navigation';

import CrRepository from '@/db/repositories/CrRepository';
import { mapCRToWidget } from '@/utils/mappers/cr';
import { getWidgetLink } from '@/utils/widgets';
import { WIDGET_TYPE_CRALERT } from '@/constants/widgets';
import type { TWidgetCRAlert } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetCRAlert> => {
  const cr = await CrRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  const data = mapCRToWidget(cr);
  if (data.type !== WIDGET_TYPE_CRALERT) {
    const route = getWidgetLink(slug, false, 'crAlert');

    return redirect(route);
  }

  return data;
};
