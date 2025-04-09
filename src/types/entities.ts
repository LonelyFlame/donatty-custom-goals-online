import { users, goals, alerts } from '@/db/schema';

export type TUser = typeof users.$inferSelect;

export type TGoal = typeof goals.$inferSelect;
export type TGoalCompact = Pick<TGoal, 'slug' | 'name' | 'type'>;

export type TAlert = typeof alerts.$inferSelect;
export type TAlertCompact = Pick<TGoal, 'slug' | 'name' | 'type'>;
