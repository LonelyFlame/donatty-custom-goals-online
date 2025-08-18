'use client';

import { Select } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import { partsValidator } from '@/validation/validators';

const { forms: { parts: t } } = translations;

const Parts = () => {
  return (
    <FormItem
      rules={[
        {
          validator: (_, value: string[]) => {
            const isValid = !value?.length || partsValidator(value);

            if (isValid) {
              return Promise.resolve();
            }

            return Promise.reject(new Error(t.available));
          },
        },
      ]}
      label={t.label}
      name="parts"
    >
      <Select mode="tags" />
    </FormItem>
  );
};

export default Parts;
