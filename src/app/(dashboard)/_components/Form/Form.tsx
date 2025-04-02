'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Button, Form as AntdForm, type UploadFile } from 'antd';
import type { PropsWithChildren } from 'react';

import { template } from '@/utils/strings';
import SuccessTooltip from '@/components/ui/SuccessTooltip';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import translations from '@/translations';
import type { TWidgetType, TWidget } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

import { postSubmit } from './utils';

interface Props extends PropsWithChildren {
  type: TWidgetType;
  data?: TWidget;
  slug?: string;
}

const { forms: { submit: t } } = translations;

const Form = ({ children, type, data, slug }: Props) => {
  const isUpdate = Boolean(slug);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const timeoutRef = useRef<number|undefined>(undefined);

  const router = useRouter();

  const [form] = AntdForm.useForm<TWidgetFormData>();

  useEffect(() => {
    if (!data) return;

    const { image, imageSecondary } = data;
    const imageData: undefined | [UploadFile] = !image ? undefined : [{
      uid: uuidv4(),
      name: 'image',
      url: image,
    }];
    const imageSecondaryData: undefined | [UploadFile] = !imageSecondary ? undefined : [{
      uid: uuidv4(),
      name: 'imageSecondary',
      url: imageSecondary,
    }];

    const formData: TWidgetFormData = { ...data, image: imageData, imageSecondary: imageSecondaryData }

    form.setFieldsValue(formData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (data: TWidgetFormData) => {
    setLoading(true);

    try {
      const response = await postSubmit(data, type, slug);
      const responseJson = await response.json();

      setShowSuccess(true);

      if (slug) {
        setLoading(false);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setShowSuccess(false);
        }, 1000);

        return;
      }

      router.push(template(MAP_TYPE_TO_MANAGE_ROUTE[type], { slug: responseJson.slug }));
    } catch (error: any) {
      console.error(error);

      setLoading(false);
    }
  }

  const submitDisabled = loading || (!isUpdate && showSuccess);

  return (
    <AntdForm layout="vertical" form={form} onFinish={handleSubmit} autoComplete="off">
      {children}
      <SuccessTooltip title={t.success} open={showSuccess && isUpdate}>
        <Button disabled={submitDisabled} type="primary" htmlType="submit">
          {isUpdate ? t.update : t.create}
        </Button>
      </SuccessTooltip>
    </AntdForm>
  );
};

export default Form;
