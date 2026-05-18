import { notFound } from 'next/navigation';

import BoostyRepository from '@/db/repositories/BoostyRepository';
import { mapBoostyToWidget } from '@/utils/mappers/boosty';
import { WIDGET_TYPE_BOOSTY_COUNT } from '@/constants/widgets';
import type { TWidgetBoostyCount } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetBoostyCount> => {
  const cr = await BoostyRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  const data = mapBoostyToWidget(cr);
  if (data.type !== WIDGET_TYPE_BOOSTY_COUNT) {
    return notFound();
  }

  return data;
};
