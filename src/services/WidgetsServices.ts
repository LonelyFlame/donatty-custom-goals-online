import GoalRepository from '@/db/repositories/GoalRepository';
import AlertRepository from '@/db/repositories/AlertRepository';
import CrRepository from '@/db/repositories/CrRepository';
import UserRepository from '@/db/repositories/UserRepository';
import BoostyRepository from '@/db/repositories/BoostyRepository';
import type { TGoal, TAlert, TCrowdRepublic, TBoosty } from '@/types/widgets';
import type { TGoal as TGoalEntity, TAlert as TAlertEntity, TCR as TCREntity, TBoosty as TBoostyEntity } from '@/types/entities';

class WidgetsServices {
  public static createOrUpdate = async (
    authUserEmail: string,
    { slug, ...data }: TGoal | TAlert | TCrowdRepublic | TBoosty
  ): Promise<TGoalEntity | TAlertEntity | TCREntity | TBoostyEntity> => {
    const user = await UserRepository.findOrCreateByEmail(authUserEmail);

    if (!user?.id) {
      throw new Error('Something went wrong on widget creation/update. User is unavailable.');
    }

    const isGoal = data.type === 'opposite' || data.type === 'clock' || data.type === 'circle' || data.type === 'oscilloscope' || data.type === 'multiple';
    if (isGoal) {
      return GoalRepository.createOrUpdate(user.id, data, slug);
    }

    const isAlert = data.type === 'lss' || data.type === 'dying';
    if (isAlert) {
      return AlertRepository.createOrUpdate(user.id, data, slug);
    }

    const isCr = data.type === 'cr';
    const crAlert = data.type === 'crAlert';
    if (isCr || crAlert) {
      return CrRepository.createOrUpdate(user.id, data, slug);
    }

    const isBoosty = data.type === 'boosty_count';
    if (isBoosty) {
      return BoostyRepository.createOrUpdate(user.id, data, slug);
    }

    throw new Error('Something went wrong on widget creation/update. Unsupported widget type.');
  };
}

export default WidgetsServices;
