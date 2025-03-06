import GoalRepository from '@/db/repositories/GoalRepository';
import UserRepository from '@/db/repositories/UserRepository';
import type { TGoal } from '@/types/entities';

export const getData = async (email: string): Promise<TGoal[]> => {
  const user = await UserRepository.findByEmail(email);

  if (!user) return [];

  const goals = await GoalRepository.getByUser(user.id);

  return goals;
};
