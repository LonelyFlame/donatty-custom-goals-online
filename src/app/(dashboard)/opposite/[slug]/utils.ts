import { notFound, redirect, forbidden } from 'next/navigation';

import { auth } from '@/auth';
import GoalRepository from '@/db/repositories/GoalRepository';
import { mapGoalToWidget } from '@/mappers/goals';
import { template } from '@/utils/strings';
import { ROUTES } from '@/constants/routes';
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
    return redirect(template(ROUTES.OPPOSITE, { slug }));
  }

  return data;
};
