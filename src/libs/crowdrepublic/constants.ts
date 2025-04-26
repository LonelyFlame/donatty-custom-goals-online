export const BASE_URI = 'https://crowdrepublic.ru';

export const PROJECTS_URI = `${BASE_URI}/projects`;

export const API_URI_GET = `${BASE_URI}/?route=crowd/project/get`;

export const API_PARAM_PROJECT = 'project_id';
export const API_PARAM_SECTION = 'section';

export const API_SECTIONS = {
  GOALS: 'goals',
} satisfies Record<string, string>;

export const SYNC_DELAY = 2 * 60 * 1000; // 2 mins
