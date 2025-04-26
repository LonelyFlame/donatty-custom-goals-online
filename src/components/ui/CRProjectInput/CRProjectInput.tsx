'use client';

import { Input } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import { crProjectLinkValidator } from '@/validation/validators';

interface Props {
  name: string;
  required?: boolean;
}

const { forms: { crProject: t } } = translations;

const CRProjectInput = ({ name, required }: Props) => {
  return (
    <FormItem
      name={name}
      label={t.label}
      rules={[
        { required: required, message: t.required },
        {
          validator: (_, value: string) => {
            const isValid = crProjectLinkValidator(value, false);

            if (isValid === true) {
              return Promise.resolve();
            }

            return Promise.reject(new Error(t.format));
          },
        },
      ]}
    >
      <Input placeholder={t.placeholder} autoComplete="off" />
    </FormItem>
  );
};

export default CRProjectInput;
