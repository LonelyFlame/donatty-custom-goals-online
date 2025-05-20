import {
  API_PARAM_PROJECT,
  API_PARAM_SECTION,
  API_SECTIONS,
  API_URI_GET,
  BASE_URI,
  IMAGE_TRANSFORM_TYPE_MAP_TO_ALIAS,
  IMAGE_URL,
} from './constants';

export const getProjectUri = (id: number):string => {
  return `${API_URI_GET}&${API_PARAM_PROJECT}=${id}`;
};

export const getProjectGoalsUri = (id: number):string => {
  const projectUri = getProjectUri(id);

  return `${projectUri}&${API_PARAM_SECTION}=${API_SECTIONS.GOALS}`;
};

export const getProjectRewardsUri = (id: number):string => {
  const projectUri = getProjectUri(id);

  return `${projectUri}&${API_PARAM_SECTION}=${API_SECTIONS.REWARDS}`;
};

export const getImageUri = (
  uploadUrl: string,
  transformType?: 'crop' | 'reduce',
  width?: number | '-',
  height?: number | '-',
):string => {
  let transform = '';
  if (transformType) {
    const transformAlias = IMAGE_TRANSFORM_TYPE_MAP_TO_ALIAS[transformType];

    transform = `/${transformAlias}/${width || '-'}x${height || '-'}`;
  }

  return `${BASE_URI}${transform}${IMAGE_URL}/${uploadUrl}`;
};
