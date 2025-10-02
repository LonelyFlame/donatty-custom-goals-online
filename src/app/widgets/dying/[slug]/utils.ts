import { notFound, redirect } from 'next/navigation';

import AlertRepository from '@/db/repositories/AlertRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapAlertToWidget } from '@/utils/mappers/alerts';
import { WIDGET_TYPE_DYING } from '@/constants/widgets';
import type { TWidgetDying } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetDying> => {
  const alert = await AlertRepository.findBySlug(slug);

  if (!alert) {
    return notFound();
  }

  const data = mapAlertToWidget(alert);
  if (data.type !== WIDGET_TYPE_DYING) {
    const route = getWidgetLink(slug, false, 'alert');

    return redirect(route);
  }

  return data;
};
