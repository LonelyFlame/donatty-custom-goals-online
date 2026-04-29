import type { NextRequest } from 'next/server';

import { boostyGetJson } from '../BRequest';
import { API_SECTIONS } from '../constants';
import type { TBRequestResponses } from '../types/requests';

export const GET = async (
  request: NextRequest,
  getStoredSecret?: (_slug: string) => Promise<string | undefined>,
): Promise<Response> => {
  try {
    const section = request.nextUrl.searchParams.get('section') as TBRequestResponses || null;
    const slug = request.nextUrl.searchParams.get('slug');
    let secret: string | null | undefined = request.nextUrl.searchParams.get('secret');

    if (!section) {
      return Response.json('Query param "section" is required', { status: 400 });
    }

    if (!slug && !secret && getStoredSecret) {
      return Response.json('Query param "slug" or "secret" is required', { status: 400 });
    }

    if (!secret && !getStoredSecret) {
      return Response.json('Query param "secret" is required', { status: 400 });
    }

    if (slug && getStoredSecret) {
      secret = await getStoredSecret(slug);
    }

    if (!secret) {
      return Response.json(
        'App secret not found',
        { status: 404 }
      );
    }

    const params: Record<string, string> = {};
    if (section === API_SECTIONS.SUBSCRIBERS) {
      const limit = request.nextUrl.searchParams.get('limit');
      const offset = request.nextUrl.searchParams.get('offset');

      if (limit) {
        params.limit = String(limit);
      }

      if (offset) {
        params.limit = String(offset);
      }
    }

    const response = await boostyGetJson(secret, section, params);

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};
