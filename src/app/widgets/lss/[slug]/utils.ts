import { notFound, redirect } from 'next/navigation';

import AlertRepository from '@/db/repositories/AlertRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapAlertToWidget } from '@/utils/mappers/alerts';
import { WIDGET_TYPE_LSS } from '@/constants/widgets';
import type { TWidgetLSS } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetLSS> => {
  const alert = await AlertRepository.findBySlug(slug);

  if (!alert) {
    return notFound();
  }

  const data = mapAlertToWidget(alert);
  if (data.type !== WIDGET_TYPE_LSS) {
    const route = getWidgetLink(slug, false, 'alert');

    return redirect(route);
  }

  return data;
};
