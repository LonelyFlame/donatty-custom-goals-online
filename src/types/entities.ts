import { users, goals, alerts, crs } from '@/db/schema';

export type TUser = typeof users.$inferSelect;

export type TGoal = typeof goals.$inferSelect;
export type TGoalCompact = Pick<TGoal, 'slug' | 'name' | 'type'>;

export type TAlert = typeof alerts.$inferSelect;
export type TAlertCompact = Pick<TAlert, 'slug' | 'name' | 'type'>;

export type TCR = typeof crs.$inferSelect;
export type TCRCompact = Pick<TCR, 'slug' | 'name' | 'type'>;
