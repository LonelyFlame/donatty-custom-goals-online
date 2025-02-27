import GoalRepository from '@/db/repositories/GoalRepository';
import UserRepository from '@/db/repositories/UserRepository';
import type { TWidget, TWidgetType } from '@/types/widgets';
import type { TGoal } from '@/types/entities';

class WidgetsServices {
  public static createOrUpdate = async (authUserEmail: string, type: TWidgetType, { slug, name, ...settings }: TWidget): Promise<TGoal> => {
    const user = await UserRepository.findOrCreateByEmail(authUserEmail);

    if (!user?.id) {
      throw new Error('Something went wrong on widget creation/update. User is unavailable.');
    }

    if (!slug) {
      const goal = await GoalRepository.create(name, type, user.id, settings);

      if (!goal?.id) {
        throw new Error('Something went wrong on widget creation. Goal are not created.');
      }

      return goal;
    }

    const goal = await GoalRepository.findBySlug(slug);
    if (!goal?.id) {
      throw new Error('Something went wrong on widget update. Slug present but goal is unavailable.');
    }
    if (goal.userId !== user.id) {
      throw new Error('Something went wrong on widget update. User has no access to the goal.');
    }
    const updatedGoal = await GoalRepository.update(slug, name, settings);

    if (!updatedGoal?.id) {
      throw new Error('Something went wrong on widget update. Goal are not updated.');
    }

    return updatedGoal;
  };
}

export default WidgetsServices;
