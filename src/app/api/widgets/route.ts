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
    const isCRAlert = widget.type === 'crAlert';
    if (isCR || isCRAlert) {
      return Response.json(mapCRToWidget(widget));
    }

    const isAlert = widget.type === 'lss';
    if (isAlert) {
      return Response.json(mapAlertToWidget(widget));
    }

    // TODO: Fix types mismatch issue
    // @ts-expect-error TS2345: Argument of type
    // Types of property type are incompatible. Type "cr" | "crAlert" is not assignable to type
    return Response.json(mapGoalToWidget(widget));
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
