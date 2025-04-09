import { notFound, redirect } from 'next/navigation';

import GoalRepository from '@/db/repositories/GoalRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { WIDGET_TYPE_OSCILLOSCOPE } from '@/constants/widgets';
import type { TWidgetOscilloscope } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetOscilloscope> => {
  const goal = await GoalRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  const data = mapGoalToWidget(goal);
  if (data.type !== WIDGET_TYPE_OSCILLOSCOPE) {
    const route = getWidgetLink(slug, false);

    return redirect(route);
  }

  return data;
};
