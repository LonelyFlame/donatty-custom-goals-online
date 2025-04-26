import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { crs } from '@/db/schema';
import type { TCR as TCREntity, TUser } from '@/types/entities';
import type { TCrowdRepublic } from '@/types/widgets';

class CrRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TCrowdRepublic, 'slug'>,
  ): Promise<TCREntity | undefined> => {
    const fields: typeof crs.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(crs).values(fields).returning().then(first<TCREntity>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TCrowdRepublic, 'slug'>,
  ): Promise<TCREntity | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(crs).set(fields).where(eq(crs.slug, slug)).returning().then(first<TCREntity>);
  };

  public static findBySlug = async (slug: string): Promise<(TCREntity & { user: TUser }) | undefined> => {
    return db.query.crs.findFirst({
      where: eq(crs.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getByUser = async (userId: number): Promise<TCREntity[]> => {
    return db.query.crs.findMany({
      where: eq(crs.userId, userId),
    });
  };

  public static createOrUpdate = async (
    userId: number,
    data: Omit<TCrowdRepublic, 'slug'>,
    slug?: string,
  ): Promise<TCREntity> => {
    if (!slug) {
      const crs = await this.create(userId, data);

      if (!crs?.id) {
        throw new Error('Something went wrong on widget creation. Crowdrepublic widget are not created.');
      }

      return crs;
    }

    const crs = await this.findBySlug(slug);

    if (!crs?.id) {
      throw new Error('Something went wrong on widget update. Slug present but crowdrepublic widget is unavailable.');
    }
    if (crs.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the crowdrepublic widget.');
    }
    if (crs.type !== data.type) {
      throw new Error('Something went wrong on widget update. Crowdrepublic widget type is mismatch.');
    }

    const updatedCr = await this.update(slug, data);

    if (!updatedCr?.id) {
      throw new Error('Something went wrong on widget update. Crowdrepublic widget are not updated.');
    }

    return updatedCr;
  };
}

export default CrRepository;
