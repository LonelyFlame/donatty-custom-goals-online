import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';
import WidgetsServices from '@/services/WidgetsServices';
import { mapGoalToWidget } from '@/utils/mappers/goals';
import { mapAlertToWidget } from '@/utils/mappers/alerts';
import { mapCRToWidget } from '@/utils/mappers/cr';
import { validateWidget } from '@/validation/widget';
import type { TWidgets } from '@/types/widgets';

export const POST = auth(async (request) => {
  const session = request.auth;
  if (!session?.user?.email) {
    return unauthorized();
  }

  try {
    const body: TWidgets = await request.json();

    const { isValid, errors } = validateWidget(body);
    if (!isValid) {
      return Response.json({ message: 'Widget data is invalid', errors }, { status: 422 });
    }

    const widget = await WidgetsServices.createOrUpdate(session.user.email, body);

    const isCR = widget.type === 'cr';
    if (isCR) {
      return Response.json(mapCRToWidget(widget));
    }

    const isAlert = widget.type === 'lss';
    if (isAlert) {
      return Response.json(mapAlertToWidget(widget));
    }

    return Response.json(mapGoalToWidget(widget));
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
