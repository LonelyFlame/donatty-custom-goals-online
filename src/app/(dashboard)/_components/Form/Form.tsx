'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form as AntdForm } from 'antd';
import type { PropsWithChildren } from 'react';

import { template } from '@/utils/strings';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

import { postSubmit } from './utils';

interface Props extends PropsWithChildren {
  type: TWidgetType;
  data?: TWidgetFormData;
  slug?: string;
}

const { forms: { submit: t } } = translations;

const Form = ({ children, type, data, slug }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [form] = AntdForm.useForm<TWidgetFormData>();

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue(data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (data: TWidgetFormData) => {
    setLoading(true);

    try {
      const response = await postSubmit(data, type, slug);
      const responseJson = await response.json();

      if (slug) {
        setLoading(false);
        // TODO: Show success popup

        return;
      }

      router.push(template(MAP_TYPE_TO_MANAGE_ROUTE[type], { slug: responseJson.slug }));
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
