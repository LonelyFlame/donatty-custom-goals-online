import {
  WIDGET_TYPE_CLOCK,
  WIDGET_TYPE_OPPOSITE,
  WIDGET_TYPE_CIRCLE,
  WIDGET_TYPE_OSCILLOSCOPE,
  WIDGET_TYPE_LSS,
  WIDGET_TYPE_CR, WIDGET_TYPE_CRALERT,
} from '@/constants/widgets';
import { TWidgets } from '@/types/widgets';

import { validateOppositeWidget } from './opposite';
import { validateClockWidget } from './clock';
import { validateCircleWidget } from './circle';
import { validateOscilloscopeWidget } from './oscilloscope';
import { validateLssWidget } from './lss';
import { validateCrWidget } from './cr';
import { validateCrAlertWidget } from './crAlert';

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
    case WIDGET_TYPE_CIRCLE: {
      const validation = validateCircleWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
    case WIDGET_TYPE_OSCILLOSCOPE: {
      const validation = validateOscilloscopeWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
    case WIDGET_TYPE_LSS: {
      const validation = validateLssWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
    case WIDGET_TYPE_CR: {
      const validation = validateCrWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
    case WIDGET_TYPE_CRALERT: {
      const validation = validateCrAlertWidget(data);

      errors = { ...errors, ...validation };
      break;
    }
  }

  const isValid = Object.values(errors).length === 0;

  return { isValid, errors };
};
