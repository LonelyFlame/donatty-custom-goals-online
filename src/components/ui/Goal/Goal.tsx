'use client';

import FormItem from '@/components/ui/FormItem';
import BlurredInput from '@/components/ui/BlurredInput';
import translations from '@/translations';
import { validateGoal } from '@/validation/validators';

interface Props {
  name?: string;
  required?: boolean;
}

const { forms: { goal: t } } = translations;

const Goal = ({ name = 'goal', required }: Props) => {
  return (
    <FormItem
      name={name}
      label={t.label}
      rules={[
        { required: required, message: t.required },
        {
          validator: (_, value: string) => {
            const isValid = validateGoal(value, false);

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

export default Goal;
