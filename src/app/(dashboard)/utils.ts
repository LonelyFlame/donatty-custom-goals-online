import UserRepository from '@/db/repositories/UserRepository';
import GoalRepository from '@/db/repositories/GoalRepository';
import AlertRepository from '@/db/repositories/AlertRepository';
import CrRepository from '@/db/repositories/CrRepository';
import BoostyRepository from '@/db/repositories/BoostyRepository';
import {
  TUser,
  TGoalCompact,
  TAlertCompact,
  TCRCompact,
  TBoostyCompact,
} from '@/types/entities';

export const getUser = async (email: string): Promise<TUser | undefined> => {
  return UserRepository.findByEmail(email);
};

export const getGoals = async (user?: TUser): Promise<TGoalCompact[]> => {
  if (!user) return [];

  const goals = await GoalRepository.getByUser(user.id);
  const compact: TGoalCompact[] = goals.map(({ slug, name, type }) => ({ slug, name, type }));

  return compact;
};

export const getAlerts = async (user?: TUser): Promise<TAlertCompact[]> => {
  if (!user) return [];

  const alerts = await AlertRepository.getByUser(user.id);
  const compact: TAlertCompact[] = alerts.map(({ slug, name, type }) => ({ slug, name, type }));

  return compact;
};

export const getCrs = async (user?: TUser): Promise<TCRCompact[]> => {
  if (!user) return [];

  const alerts = await CrRepository.getByUser(user.id);
  const compact: TCRCompact[] = alerts.map(({ slug, name, type }) => ({ slug, name, type }));

  return compact;
};

export const getBoosties = async (user?: TUser): Promise<TBoostyCompact[]> => {
  if (!user) return [];

  const boosties = await BoostyRepository.getByUser(user.id);
  const compact = boosties.map<TBoostyCompact>(({ slug, name, type }) => ({ slug, name, type }));

  return compact;
};
