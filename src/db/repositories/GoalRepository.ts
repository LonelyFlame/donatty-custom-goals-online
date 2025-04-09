import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { goals } from '@/db/schema';
import type { TGoal as TGoalEntities, TUser } from '@/types/entities';
import type { TGoal } from '@/types/widgets';

class GoalRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TGoal, 'slug'>,
  ): Promise<TGoalEntities | undefined> => {
    const fields: typeof goals.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(goals).values(fields).returning().then(first<TGoalEntities>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TGoal, 'slug'>,
  ): Promise<TGoalEntities | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(goals).set(fields).where(eq(goals.slug, slug)).returning().then(first<TGoalEntities>);
  };

  public static findBySlug = async (slug: string): Promise<(TGoalEntities & { user: TUser }) | undefined> => {
    return db.query.goals.findFirst({
      where: eq(goals.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TGoalEntities[]> => {
    return db.query.goals.findMany({
      where: eq(goals.userId, userId),
    });
  };
}

export default GoalRepository;
