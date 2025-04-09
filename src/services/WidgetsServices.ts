import GoalRepository from '@/db/repositories/GoalRepository';
import AlertRepository from '@/db/repositories/AlertRepository';
import UserRepository from '@/db/repositories/UserRepository';
import type { TGoal, TAlert } from '@/types/widgets';
import type { TGoal as TGoalEntity, TAlert as TAlertEntity } from '@/types/entities';

class WidgetsServices {
  public static createOrUpdate = async (
    authUserEmail: string,
    data: TGoal | TAlert
  ): Promise<TGoalEntity | TAlertEntity> => {
    const user = await UserRepository.findOrCreateByEmail(authUserEmail);

    if (!user?.id) {
      throw new Error('Something went wrong on widget creation/update. User is unavailable.');
    }

    const isGoal = data.type === 'opposite' || data.type === 'clock' || data.type === 'circle' || data.type === 'oscilloscope';
    if (isGoal) {
      return this.createOrUpdateGoal(user.id, data);
    }

    const isAlert = data.type === 'lss';
    if (isAlert) {
      return this.createOrUpdateAlert(user.id, data);
    }

    throw new Error('Something went wrong on widget creation/update. Unsupported widget type.');
  };

  protected static createOrUpdateGoal = async (
    userId: number,
    { slug, ...data }: TGoal
  ): Promise<TGoalEntity> => {
    if (!slug) {
      const goal = await GoalRepository.create(userId, data);

      if (!goal?.id) {
        throw new Error('Something went wrong on widget creation. Goal are not created.');
      }

      return goal;
    }

    const goal = await GoalRepository.findBySlug(slug);

    if (!goal?.id) {
      throw new Error('Something went wrong on widget update. Slug present but goal is unavailable.');
    }
    if (goal.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the goal.');
    }
    if (goal.type !== data.type) {
      throw new Error('Something went wrong on widget update. Goal type is mismatch.');
    }

    const updatedGoal = await GoalRepository.update(slug, data);

    if (!updatedGoal?.id) {
      throw new Error('Something went wrong on widget update. Goal are not updated.');
    }

    return updatedGoal;
  };

  protected static createOrUpdateAlert = async (
    userId: number,
    { slug, ...data }: TAlert
  ): Promise<TAlertEntity> => {
    if (!slug) {
      const alert = await AlertRepository.create(userId, data);

      if (!alert?.id) {
        throw new Error('Something went wrong on widget creation. Alert are not created.');
      }

      return alert;
    }

    const alert = await AlertRepository.findBySlug(slug);

    if (!alert?.id) {
      throw new Error('Something went wrong on widget update. Slug present but alert is unavailable.');
    }
    if (alert.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the alert.');
    }
    if (alert.type !== data.type) {
      throw new Error('Something went wrong on widget update. Alert type is mismatch.');
    }

    const updatedAlert = await AlertRepository.update(slug, data);

    if (!updatedAlert?.id) {
      throw new Error('Something went wrong on widget update. Alert are not updated.');
    }

    return updatedAlert;
  };
}

export default WidgetsServices;
