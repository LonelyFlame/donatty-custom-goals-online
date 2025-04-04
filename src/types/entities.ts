import { users, goals } from '@/db/schema';

export type TUser = typeof users.$inferSelect;

export type TGoal = typeof goals.$inferSelect;
export type TGoalCompact = Pick<TGoal, 'slug' | 'name' | 'type'>;
