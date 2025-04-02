import { WIDGET_TYPE_CLOCK, WIDGET_TYPE_OPPOSITE } from '@/constants/widgets';
import { TWidgets } from '@/types/widgets';

import { validateOppositeWidget } from './opposite';
import { validateClockWidget } from './clock';

export const validateWidget = (data: TWidgets): { isValid: boolean; errors: Record<string, string> } => {
  const { name, type } = data;

  let errors: Record<string, string> = {};

  if (!name) {
    errors.name = 'required';
  }

  switch (type) {
    case WIDGET_TYPE_OPPOSITE: {
      const validation = validateOppositeWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
    case WIDGET_TYPE_CLOCK: {
      const validation = validateClockWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
  }

  const isValid = Object.values(errors).length === 0;

  return { isValid, errors };
};
