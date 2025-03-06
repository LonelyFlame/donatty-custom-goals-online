import { notFound, permanentRedirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import GoalRepository from '@/db/repositories/GoalRepository';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { template } from '@/utils/strings';
import { WIDGET_TYPE_OPPOSITE } from '@/constants/widgets';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
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
    const route = MAP_TYPE_TO_MANAGE_ROUTE[data.type];

    return permanentRedirect(template(route, { slug }));
  }

  return data;
};
