import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import first from 'lodash/first';

import db from '@/db';
import { boosty } from '@/db/schema';
import type { TBoosty as TBoostyEntity, TUser } from '@/types/entities';
import type { TBoosty } from '@/types/widgets';

class BoostyRepository {
  public static create = async (
    userId: number,
    { type, name, ...settings }: Omit<TBoosty, 'slug'>,
  ): Promise<TBoostyEntity | undefined> => {
    const fields: typeof boosty.$inferInsert = {
      name,
      type,
      userId,
      slug: uuidv4(),
      settings: JSON.stringify(settings),
    };

    return db.insert(boosty).values(fields).returning().then(first<TBoostyEntity>);
  };

  public static update = async (
    slug: string,
    { type, name, ...settings }: Omit<TBoosty, 'slug'>,
  ): Promise<TBoostyEntity | undefined> => {
    const fields = {
      name,
      settings: JSON.stringify(settings),
    };

    return db.update(boosty).set(fields).where(eq(boosty.slug, slug)).returning().then(first<TBoostyEntity>);
  };

  public static findBySlug = async (slug: string): Promise<(TBoostyEntity & { user: TUser }) | undefined> => {
    return db.query.boosty.findFirst({
      where: eq(boosty.slug, slug),
      with: {
        user: true,
      },
    });
  };

  public static getSecretBySlug = async (slug: string): Promise<string | undefined> => {
    const widget = await this.findBySlug(slug);
    if (!widget) {
      return undefined;
    }

    const widgetSettings = JSON.parse(widget.settings) as Omit<TBoosty, 'name' | 'type' | 'slug'>

    return widgetSettings.secret || undefined;
  };

  public static getByUser = async (userId: number): Promise<TBoostyEntity[]> => {
    return db.query.boosty.findMany({
      where: eq(boosty.userId, userId),
    });
  };

  public static createOrUpdate = async (
    userId: number,
    data: Omit<TBoosty, 'slug'>,
    slug?: string,
  ): Promise<TBoostyEntity> => {
    if (!slug) {
      const boosty = await this.create(userId, data);

      if (!boosty?.id) {
        throw new Error('Something went wrong on widget creation. Boosty widget are not created.');
      }

      return boosty;
    }

    const boosty = await this.findBySlug(slug);

    if (!boosty?.id) {
      throw new Error('Something went wrong on widget update. Slug present but Boosty widget is unavailable.');
    }
    if (boosty.userId !== userId) {
      throw new Error('Something went wrong on widget update. User has no access to the Boosty widget.');
    }
    if (boosty.type !== data.type) {
      throw new Error('Something went wrong on widget update. Boosty widget type is mismatch.');
    }

    const updatedBoosty = await this.update(slug, data);

    if (!updatedBoosty?.id) {
      throw new Error('Something went wrong on widget update. Boosty widget are not updated.');
    }

    return updatedBoosty;
  };
}

export default BoostyRepository;
export { BoostyRepository };
