import { notFound, permanentRedirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import CrRepository from '@/db/repositories/CrRepository';
import { mapCRToWidget } from '@/utils/mappers/cr';
import { template } from '@/utils/strings';
import { WIDGET_TYPE_CR } from '@/constants/widgets';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import type { TWidgetCR } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetCR> => {
  const cr = await CrRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  const session = await auth();
  if (cr.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapCRToWidget(cr);
  if (data.type !== WIDGET_TYPE_CR) {
    const route = MAP_TYPE_TO_MANAGE_ROUTE[data.type];

    return permanentRedirect(template(route, { slug }));
  }

  return data;
};
