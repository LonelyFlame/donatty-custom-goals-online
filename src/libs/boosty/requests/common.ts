import { BASE_URL, PROXY_URI, SECRET_KEY_HEADER } from '../constants';
import type { TBRequestResponseMap } from '../types/requests';
import { TBErrorResponse } from '../types/responses';

export function boostyGetJson<R extends keyof TBRequestResponseMap>(
  secret: string,
  section: R,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R] | TBErrorResponse> {
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
  slug?: string,
  secret?: string,
  params?: Record<string, string>,
): Promise<TBRequestResponseMap[R] | TBErrorResponse | null> {
  if (!slug && !secret) {
    return null;
  }

  let url = PROXY_URI;

  const query: Record<string, string> = { section };
  if (slug) {
    query.slug = String(slug);
  }
  if (secret) {
    query.secret = String(secret);
  }
  if (params?.limit) {
    query.limit = String(params.limit);
  }
  if (params?.offset) {
    query.offset = String(params.offset);
  }

  const queryString = new URLSearchParams(query).toString();
  url += `?${queryString}`;

  try {
    const response = await fetch(url);

    return await response.json() as Promise<TBRequestResponseMap[R]>;
  } catch (error) {
    console.error('[fetchByProxy]', error);

    return null;
  }
}
