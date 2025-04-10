import GoalRepository from '@/db/repositories/GoalRepository';
import AlertRepository from '@/db/repositories/AlertRepository';
import UserRepository from '@/db/repositories/UserRepository';
import type { TGoal, TAlert } from '@/types/widgets';
import type { TGoal as TGoalEntity, TAlert as TAlertEntity } from '@/types/entities';

class WidgetsServices {
  public static createOrUpdate = async (
    authUserEmail: string,
    { slug, ...data }: TGoal | TAlert
  ): Promise<TGoalEntity | TAlertEntity> => {
    const user = await UserRepository.findOrCreateByEmail(authUserEmail);

    if (!user?.id) {
      throw new Error('Something went wrong on widget creation/update. User is unavailable.');
    }

    const isGoal = data.type === 'opposite' || data.type === 'clock' || data.type === 'circle' || data.type === 'oscilloscope';
    if (isGoal) {
      return GoalRepository.createOrUpdate(user.id, data, slug);
    }

    const isAlert = data.type === 'lss';
    if (isAlert) {
      return AlertRepository.createOrUpdate(user.id, data, slug);
    }

    throw new Error('Something went wrong on widget creation/update. Unsupported widget type.');
  };
}

export default WidgetsServices;
