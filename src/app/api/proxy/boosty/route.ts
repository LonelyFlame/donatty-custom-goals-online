import type { NextRequest } from 'next/server';

import { GET as BGet } from '@/libs/boosty/proxy/BNextProxy';

import BoostyRepository from '@/db/repositories/BoostyRepository';

export function GET (request: NextRequest) {
  return BGet(request, BoostyRepository.getSecretBySlug);
}
