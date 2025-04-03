'use client';

import { Form } from 'antd';

import ImageUpload from '@/components/ui/ImageUpload';
import translations from '@/translations';
import type { TWidgetClockFormData } from '@/types/forms';

const { forms: t } = translations;

const ImageSecondary = () => {
  const form = Form.useFormInstance<TWidgetClockFormData>();
  const goalSecondary = Form.useWatch('goalSecondary', form);

  const isRequired = Boolean(goalSecondary);

  return (
    <ImageUpload
      label={t.image.label}
      name="imageSecondary"
      required={isRequired}
    />
  );
};

export default ImageSecondary;
