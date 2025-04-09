import { notFound } from 'next/navigation';

import GoalRepository from '@/db/repositories/GoalRepository';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import type { TGoals } from '@/types/widgets';

export const getData = async (slug: string): Promise<TGoals> => {
  const goal = await GoalRepository.findBySlug(slug);

  if (!goal) {
    return notFound();
  }

  return mapGoalToWidget(goal);
};
