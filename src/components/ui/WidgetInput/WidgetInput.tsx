'use client';

import type { TDWidgetType } from '@/libs/dontatty/types/widget';

import FormItem from '@/components/ui/FormItem';
import BlurredInput from '@/components/ui/BlurredInput';
import translations from '@/translations';
import { widgetValidator } from '@/validation/validators';

interface Props {
  name: string;
  widgetType: TDWidgetType,
  required?: boolean;
}

const { forms: { widget: t } } = translations;

const WidgetInput = ({ name, required, widgetType }: Props) => {
  return (
    <FormItem
      name={name}
      label={t.label}
      rules={[
        { required: required, message: t.required },
        {
          validator: (_, value: string) => {
            const isValid = widgetValidator(widgetType, value, false);

            if (isValid === true) {
              return Promise.resolve();
            }

            return Promise.reject(new Error(t.format));
          },
        },
      ]}
    >
      <BlurredInput placeholder={t.placeholder} autoComplete="off" />
    </FormItem>
  );
};

export default WidgetInput;
