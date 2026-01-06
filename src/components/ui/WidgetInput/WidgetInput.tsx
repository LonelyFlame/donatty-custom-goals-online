'use client';

import type { TDWidgetType } from '@/libs/dontatty/types/widget';

import FormItem from '@/components/ui/FormItem';
import BlurredInput from '@/components/ui/BlurredInput';
import translations from '@/translations';
import { widgetLinkValidator, multipleWidgetLinkValidator } from '@/validation/validators';

interface Props {
  name: string;
  widgetType: TDWidgetType,
  required?: boolean;
  multiple?: boolean;
}

const { forms: { widget: t } } = translations;

const WidgetInput = ({ name, required, widgetType, multiple }: Props) => {
  return (
    <FormItem
      name={name}
      label={t.label}
      rules={[
        { required: required, message: t.required },
        {
          validator: (_, value: string) => {
            const validator = multiple ? multipleWidgetLinkValidator : widgetLinkValidator;
            const isValid = validator(widgetType, value, false);

            if (isValid === true) {
              return Promise.resolve();
            }

            return Promise.reject(new Error(t.format));
          },
        },
      ]}
    >
      <BlurredInput placeholder={t.placeholder[widgetType]} autoComplete="off" />
    </FormItem>
  );
};

export default WidgetInput;
