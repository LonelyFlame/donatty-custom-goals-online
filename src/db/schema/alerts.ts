import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { WIDGET_TYPE_DYING, WIDGET_TYPE_LSS } from '@/constants/widgets';

import users from './users';

const alerts = sqliteTable('alerts', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id').notNull(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  type: text({ enum: [
    WIDGET_TYPE_LSS,
    WIDGET_TYPE_DYING,
  ] }).notNull(),
  settings: text().notNull(),
});

export const alertsRelations = relations(alerts, ({ one }) => ({
  user: one(users, {
    fields: [alerts.userId],
    references: [users.id],
  }),
}));

export default alerts;
