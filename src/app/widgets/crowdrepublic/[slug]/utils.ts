import { notFound } from 'next/navigation';

import CrRepository from '@/db/repositories/CrRepository';
import { mapCRToWidget } from '@/utils/mappers/cr';
import type { TCRs } from '@/types/widgets';

export const getData = async (slug: string): Promise<TCRs> => {
  const cr = await CrRepository.findBySlug(slug);

  if (!cr) {
    return notFound();
  }

  return mapCRToWidget(cr);
};
