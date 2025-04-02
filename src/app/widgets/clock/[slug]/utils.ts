import { notFound, redirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import GoalRepository from '@/db/repositories/GoalRepository';
import { getWidgetLink } from '@/utils/widgets';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { WIDGET_TYPE_CLOCK } from '@/constants/widgets';
import type { TWidgetClock } from '@/types/widgets';

export const getData = async (slug: string): Promise<TWidgetClock> => {
  const goal = await GoalRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  const session = await auth();
  if (goal.user.email !== session?.user?.email) {
    return forbidden();
  }

  const data = mapGoalToWidget(goal);
  if (data.type !== WIDGET_TYPE_CLOCK) {
    const route = getWidgetLink(data.type, slug, false);

    return redirect(route);
  }

  return data;
};
