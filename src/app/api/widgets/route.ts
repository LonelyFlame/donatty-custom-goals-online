import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';
import WidgetsServices from '@/services/WidgetsServices';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { validateWidget } from '@/validation/widget';
import type { TWidget } from '@/types/widgets';

export const POST = auth(async (request) => {
  const session = request.auth;
  if (!session?.user?.email) {
    return unauthorized();
  }

  try {
    const body: TWidget = await request.json();

    const { isValid, errors } = validateWidget(body);
    if (!isValid) {
      return Response.json({ message: 'Widget data is invalid', errors }, { status: 422 });
    }

    const goal = await WidgetsServices.createOrUpdate(session.user.email, body);

    return Response.json(mapGoalToWidget(goal));
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
