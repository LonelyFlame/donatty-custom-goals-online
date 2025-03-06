import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { WIDGET_TYPE_CIRCLE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_OPPOSITE } from '@/constants/widgets';

import users from './users';

const goals = sqliteTable('goals', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id').notNull(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  type: text({ enum: [WIDGET_TYPE_OPPOSITE, WIDGET_TYPE_CLOCK, WIDGET_TYPE_CIRCLE] }).notNull(),
  settings: text().notNull(),
});

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));

export default goals;
