import { BASE_URL, PROXY_URI, SECRET_KEY_HEADER } from '../constants';
import type { TBRequestResponseMap } from '../types/requests';

export function boostyGetJson<R extends keyof TBRequestResponseMap>(
  secret: string,
  section: R,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R]> {
  const url = new URL(`${BASE_URL}/${section}`);

  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(
    url,
    {
      method: 'GET',
      headers: { [SECRET_KEY_HEADER]: secret },
    },
  ).then((response) => response.json());
}

export async function fetchByProxy<R extends keyof TBRequestResponseMap>(
  section: R,
  slug: string,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R] | null> {
  const url = new URL(`${PROXY_URI}/${section}`);

  const query: Record<string, string> = { slug };
  if (params?.limit) {
    query.limit = String(params.limit);
  }
  if (params?.offset) {
    query.offset = String(params.offset);
  }

  url.search = new URLSearchParams(query).toString();

  try {
    const response = await fetch(url);

    return await response.json() as Promise<TBRequestResponseMap[R]>;
  } catch (error) {
    console.error('[fetchByProxy]', error);

    return null;
  }
}
