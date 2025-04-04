import { notFound, redirect } from 'next/navigation';

import GoalRepository from '@/db/repositories/GoalRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { WIDGET_TYPE_CIRCLE } from '@/constants/widgets';
import type { TWidgetCircle } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetCircle> => {
  const goal = await GoalRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  const data = mapGoalToWidget(goal);
  if (data.type !== WIDGET_TYPE_CIRCLE) {
    const route = getWidgetLink(data.type, slug, false);

    return redirect(route);
  }

  return data;
};
