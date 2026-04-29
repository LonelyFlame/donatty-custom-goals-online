import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { WIDGET_TYPE_BOOSTY_COUNT } from '@/constants/widgets';

import users from './users';

const boosty = sqliteTable('boosty', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id').notNull(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  type: text({ enum: [
    WIDGET_TYPE_BOOSTY_COUNT,
  ] }).notNull(),
  settings: text().notNull(),
});

export const boostyRelations = relations(boosty, ({ one }) => ({
  user: one(users, {
    fields: [boosty.userId],
    references: [users.id],
  }),
}));

export default boosty;
