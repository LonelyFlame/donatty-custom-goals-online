import { notFound, permanentRedirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import BoostyRepository from '@/db/repositories/BoostyRepository';
import { mapBoostyToWidget } from '@/utils/mappers/boosty';
import { template } from '@/utils/strings';
import { WIDGET_TYPE_BOOSTY_COUNT } from '@/constants/widgets';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import type { TWidgetBoostyCount } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetBoostyCount> => {
  const boosty = await BoostyRepository.findBySlug(slug);

  if (!boosty) {
    return notFound();
  }

  const session = await auth();
  if (boosty.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapBoostyToWidget(boosty);
  if (data.type !== WIDGET_TYPE_BOOSTY_COUNT) {
    const route = MAP_TYPE_TO_MANAGE_ROUTE[data.type];

    return permanentRedirect(template(route, { slug }));
  }

  return data;
};
