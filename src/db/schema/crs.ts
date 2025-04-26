import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { WIDGET_TYPE_CR } from '@/constants/widgets';

import users from './users';

const crs = sqliteTable('crs', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id').notNull(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  type: text({ enum: [
    WIDGET_TYPE_CR,
  ] }).notNull(),
  settings: text().notNull(),
});

export const crsRelations = relations(crs, ({ one }) => ({
  user: one(users, {
    fields: [crs.userId],
    references: [users.id],
  }),
}));

export default crs;
