import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { WIDGET_TYPE_CR, WIDGET_TYPE_CRALERT } from '@/constants/widgets';

import users from './users';

const crs = sqliteTable('crs', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id').notNull(),
  slug: text().notNull(),
  name: text().notNull(),
  type: text({ enum: [
    WIDGET_TYPE_CR,
    WIDGET_TYPE_CRALERT,
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
