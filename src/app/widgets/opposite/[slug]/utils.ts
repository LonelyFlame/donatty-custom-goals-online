import { notFound, redirect } from 'next/navigation';

import GoalRepository from '@/db/repositories/GoalRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { WIDGET_TYPE_OPPOSITE } from '@/constants/widgets';
import type { TWidgetOpposite } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetOpposite> => {
  const goal = await GoalRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  const data = mapGoalToWidget(goal);
  if (data.type !== WIDGET_TYPE_OPPOSITE) {
    const route = getWidgetLink(slug, false, 'goal');

    return redirect(route);
  }

  return data;
};
