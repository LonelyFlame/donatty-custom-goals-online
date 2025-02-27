import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import goals from './goals';

const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
}));

export default users;
