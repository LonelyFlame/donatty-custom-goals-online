import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { goals } from '@/db/schema';
import type { TGoal as TGoalEntity, TUser } from '@/types/entities';
import type { TGoal } from '@/types/widgets';

class GoalRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TGoal, 'slug'>,
  ): Promise<TGoalEntity | undefined> => {
    const fields: typeof goals.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(goals).values(fields).returning().then(first<TGoalEntity>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TGoal, 'slug'>,
  ): Promise<TGoalEntity | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(goals).set(fields).where(eq(goals.slug, slug)).returning().then(first<TGoalEntity>);
  };

  public static findBySlug = async (slug: string): Promise<(TGoalEntity & { user: TUser }) | undefined> => {
    return db.query.goals.findFirst({
      where: eq(goals.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TGoalEntity[]> => {
    return db.query.goals.findMany({
      where: eq(goals.userId, userId),
    });
  };

  public static createOrUpdate = async (
    userId: number,
    data: Omit<TGoal, 'slug'>,
    slug?: string,
  ): Promise<TGoalEntity> => {
    if (!slug) {
      const goal = await this.create(userId, data);

      if (!goal?.id) {
        throw new Error('Something went wrong on widget creation. Goal are not created.');
      }

      return goal;
    }

    const goal = await this.findBySlug(slug);

    if (!goal?.id) {
      throw new Error('Something went wrong on widget update. Slug present but goal is unavailable.');
    }
    if (goal.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the goal.');
    }
    if (goal.type !== data.type) {
      throw new Error('Something went wrong on widget update. Goal type is mismatch.');
    }

    const updatedGoal = await this.update(slug, data);

    if (!updatedGoal?.id) {
      throw new Error('Something went wrong on widget update. Goal are not updated.');
    }

    return updatedGoal;
  };
}

export default GoalRepository;
