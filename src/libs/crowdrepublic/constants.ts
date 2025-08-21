export const BASE_URI = 'https://crowdrepublic.ru';

export const PROJECTS_URI = `${BASE_URI}/projects`;

export const API_URI_GET = `${BASE_URI}/?route=crowd/project/get`;

export const API_PARAM_PROJECT = 'project_id';
export const API_PARAM_SECTION = 'section';

export const IMAGE_URL = '/image/crowdrepublic';

export const API_SECTIONS = {
  GOALS: 'goals',
  REWARDS: 'rewards',
} satisfies Record<string, string>;

export const SYNC_DELAY = 0.5 * 60 * 1000; // 0.5 min

export const IMAGE_TRANSFORM_TYPE_MAP_TO_ALIAS = {
  crop: 'c',
  reduce: 'r',
};

export const PROXY_URI = '/api/proxy?target=';
