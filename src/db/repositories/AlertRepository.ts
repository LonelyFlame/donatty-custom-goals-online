import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { alerts } from '@/db/schema';
import type { TAlert as TAlertEntity, TUser } from '@/types/entities';
import type { TAlert } from '@/types/widgets';

class AlertRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TAlert, 'slug'>,
  ): Promise<TAlertEntity | undefined> => {
    const fields: typeof alerts.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(alerts).values(fields).returning().then(first<TAlertEntity>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TAlert, 'slug'>,
  ): Promise<TAlertEntity | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(alerts).set(fields).where(eq(alerts.slug, slug)).returning().then(first<TAlertEntity>);
  };

  public static findBySlug = async (slug: string): Promise<(TAlertEntity & { user: TUser }) | undefined> => {
    return db.query.alerts.findFirst({
      where: eq(alerts.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TAlertEntity[]> => {
    return db.query.alerts.findMany({
      where: eq(alerts.userId, userId),
    });
  };

  public static createOrUpdate = async (
    userId: number,
    data: Omit<TAlert, 'slug'>,
    slug?: string,
  ): Promise<TAlertEntity> => {
    if (!slug) {
      const alert = await this.create(userId, data);

      if (!alert?.id) {
        throw new Error('Something went wrong on widget creation. Alert are not created.');
      }

      return alert;
    }

    const alert = await this.findBySlug(slug);

    if (!alert?.id) {
      throw new Error('Something went wrong on widget update. Slug present but alert is unavailable.');
    }
    if (alert.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the alert.');
    }
    if (alert.type !== data.type) {
      throw new Error('Something went wrong on widget update. Alert type is mismatch.');
    }

    const updatedAlert = await this.update(slug, data);

    if (!updatedAlert?.id) {
      throw new Error('Something went wrong on widget update. Alert are not updated.');
    }

    return updatedAlert;
  };
}

export default AlertRepository;
