import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';
import WidgetsServices from '@/services/WidgetsServices';
import { mapGoalToWidget } from '@/utils/mappers/goals';

export const POST = auth(async (request) => {
  const session = request.auth;
  if (!session?.user?.email) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    // TODO: Add validation

    const goal = await WidgetsServices.createOrUpdate(session.user.email, 'opposite', body);

    return Response.json(mapGoalToWidget(goal));
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
