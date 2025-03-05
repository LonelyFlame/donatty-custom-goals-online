'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form as AntdForm } from 'antd';
import type { PropsWithChildren } from 'react';

import { template } from '@/utils/strings';
import { ROUTES } from '@/constants/routes';
import translations from '@/translations';
import type { TWidgetOpposite } from '@/types/widgets';
import type { TWidgetOppositeFormData } from '@/types/forms';

import { postSubmit } from './utils';

interface Props extends PropsWithChildren {
  data?: TWidgetOpposite;
  slug?: string;
}

const { forms: { submit: t } } = translations;

const Form = ({ children, data, slug }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [form] = AntdForm.useForm<TWidgetOppositeFormData>();

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (data: TWidgetOppositeFormData) => {
    setLoading(true);

    try {
      const response = await postSubmit(data, slug);
      const responseJson = await response.json();

      if (slug) {
        setLoading(false);
        // TODO: Show success popup

        return;
      }

      router.push(template(ROUTES.OPPOSITE, { slug: responseJson.slug }));
    } catch (error: any) {
      console.error(error);

      setLoading(false);
    }
  }

  return (
    <AntdForm layout="vertical" form={form} onFinish={handleSubmit} autoComplete="off">
      {children}
      <Button disabled={loading} type="primary" htmlType="submit">
        {slug ? t.update : t.create}
      </Button>
    </AntdForm>
  );
};

export default Form;
