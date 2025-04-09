import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { alerts } from '@/db/schema';
import type { TAlert as TAlertEntities, TUser } from '@/types/entities';
import type { TAlert } from '@/types/widgets';

class AlertRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TAlert, 'slug'>,
  ): Promise<TAlertEntities | undefined> => {
    const fields: typeof alerts.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(alerts).values(fields).returning().then(first<TAlertEntities>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TAlert, 'slug'>,
  ): Promise<TAlertEntities | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(alerts).set(fields).where(eq(alerts.slug, slug)).returning().then(first<TAlertEntities>);
  };

  public static findBySlug = async (slug: string): Promise<(TAlertEntities & { user: TUser }) | undefined> => {
    return db.query.alerts.findFirst({
      where: eq(alerts.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TAlertEntities[]> => {
    return db.query.alerts.findMany({
      where: eq(alerts.userId, userId),
    });
  };
}

export default AlertRepository;
