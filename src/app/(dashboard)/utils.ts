import GoalRepository from '@/db/repositories/GoalRepository';
import UserRepository from '@/db/repositories/UserRepository';
import { TGoalCompact } from '@/types/entities';

export const getData = async (email: string): Promise<TGoalCompact[]> => {
  const user = await UserRepository.findByEmail(email);

  if (!user) return [];

  const goals = await GoalRepository.getByUser(user.id);
  const compact: TGoalCompact[] = goals.map(({ slug, name, type }) => ({ slug, name, type }));

  return compact;
};
