import { notFound, permanentRedirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import CrRepository from '@/db/repositories/CrRepository';
import { mapCRToWidget } from '@/utils/mappers/cr';
import { template } from '@/utils/strings';
import { WIDGET_TYPE_CRALERT } from '@/constants/widgets';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import type { TWidgetCRAlert } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetCRAlert> => {
  const cr = await CrRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  const session = await auth();
  if (cr.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapCRToWidget(cr);
  if (data.type !== WIDGET_TYPE_CRALERT) {
    const route = MAP_TYPE_TO_MANAGE_ROUTE[data.type];

    return permanentRedirect(template(route, { slug }));
  }

  return data;
};
