import { notFound } from 'next/navigation';

import AlertRepository from '@/db/repositories/AlertRepository';
import { mapAlertToWidget } from '@/utils/mappers/alerts';
import type { TAlerts } from '@/types/widgets';

export const getData = async (slug: string): Promise<TAlerts> => {
  const alert = await AlertRepository.findBySlug(slug);

  if (!alert) {
    return notFound();
  }

  return mapAlertToWidget(alert);
};
