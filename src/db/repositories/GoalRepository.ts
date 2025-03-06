import { eq } from "drizzle-orm";
import {v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { goals } from '@/db/schema';
import type { TGoal, TUser } from '@/types/entities';
import type { TWidgetType, TWidget } from '@/types/widgets';

class GoalRepository {
  public static create = async (
    name: string,
    type: TWidgetType,
    userId: number,
    settings: Omit<TWidget, 'name'>
  ): Promise<TGoal | undefined> => {
    const fields: typeof goals.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(goals).values(fields).returning().then(first<TGoal>);
  };

  public static update = async (
    slug: string,
    name: string,
    settings: Omit<TWidget, 'name'>
  ): Promise<TGoal | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(goals).set(fields).where(eq(goals.slug, slug)).returning().then(first<TGoal>);
  };

  public static findBySlug = async (slug: string): Promise<(TGoal & { user: TUser }) | undefined> => {
    return db.query.goals.findFirst({
      where: eq(goals.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TGoal[]> => {
    return db.query.goals.findMany({
      where: eq(goals.userId, userId),
    });
  };
}

export default GoalRepository;
