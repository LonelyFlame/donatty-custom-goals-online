'use client';

import { useEffect } from 'react';
import { Form as AntdForm } from 'antd';
import type { PropsWithChildren } from 'react';

import type { WidgetOpposite } from '@/types/widgets';

interface Props extends PropsWithChildren {
  data?: WidgetOpposite;
}

const Form = ({ children, data }: Props) => {
  const [form] = AntdForm.useForm();

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AntdForm layout='vertical' form={form}>
      {children}
    </AntdForm>
  );
};

export default Form;
