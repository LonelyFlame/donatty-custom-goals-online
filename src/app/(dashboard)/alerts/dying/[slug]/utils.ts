import { notFound, permanentRedirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import AlertRepository from '@/db/repositories/AlertRepository';
import { mapAlertToWidget } from '@/utils/mappers/alerts';
import { template } from '@/utils/strings';
import { WIDGET_TYPE_DYING } from '@/constants/widgets';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import type { TWidgetDying } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetDying> => {
  const alert = await AlertRepository.findBySlug(slug);

  if (!alert) {
    return notFound();
  }

  const session = await auth();
  if (alert.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapAlertToWidget(alert);
  if (data.type !== WIDGET_TYPE_DYING) {
    const route = MAP_TYPE_TO_MANAGE_ROUTE[data.type];

    return permanentRedirect(template(route, { slug }));
  }

  return data;
};
