import { notFound } from 'next/navigation';

import BoostyRepository from '@/db/repositories/BoostyRepository';
import { mapBoostyToWidget } from '@/utils/mappers/boosty';
import type { TBoosties } from '@/types/widgets';

export const getData = async (slug: string): Promise<TBoosties> => {
  const goal = await BoostyRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  return mapBoostyToWidget(goal);
};
