import { notFound, redirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
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

  const session = await auth();
  if (goal.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapGoalToWidget(goal);
  if (data.type !== WIDGET_TYPE_OPPOSITE) {
    const route = getWidgetLink(data.type, slug, false);

    return redirect(route);
  }

  return data;
};
