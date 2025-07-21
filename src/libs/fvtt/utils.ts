import { FVTTRolls } from './types';

export const parseRolls = (data?: string | []): FVTTRolls | null => {
  if (typeof data !== 'string') {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (e: any) {
    console.error(e);
    return null;
  }
};
