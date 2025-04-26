import { API_PARAM_PROJECT, API_PARAM_SECTION, API_SECTIONS, API_URI_GET } from './constants';

export const getProjectUri = (id: number):string => {
  return `${API_URI_GET}&${API_PARAM_PROJECT}=${id}`;
};

export const getProjectGoalsUri = (id: number):string => {
  const projectUri = getProjectUri(id);

  return `${projectUri}&${API_PARAM_SECTION}=${API_SECTIONS.GOALS}`;
};
