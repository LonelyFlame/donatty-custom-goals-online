import type { NextRequest } from 'next/server';
import { CRGetJson } from '@/libs/crowdrepublic/CRRequest';

export const GET = async (request: NextRequest) => {
  try {
    const target = request.nextUrl.searchParams.get('target');

    if (!target) {
      return Response.json('Query param "target" is required', { status: 400 });
    }

    const url = decodeURIComponent(target);
    const response = await CRGetJson(url);

    return Response.json(response);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};
