import first from 'lodash/first';
import { eq } from "drizzle-orm";

import db from '@/db';
import { users } from '@/db/schema';
import type { TUser } from '@/types/entities';

class UserRepository {
  public static create = async (email: string): Promise<TUser | undefined> => {
    return db.insert(users).values({ email }).returning().then(first<TUser>);
  };

  public static findByEmail = async (email: string): Promise<TUser | undefined> => {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    });
  };

  public static findById = async (id: number): Promise<TUser | undefined> => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  };

  public static findOrCreateByEmail = async (email: string): Promise<TUser | undefined> => {
    let user = await this.findByEmail(email);

    if (!user) {
      user = await this.create(email);
    }

    return user;
  };
}

export default UserRepository;
