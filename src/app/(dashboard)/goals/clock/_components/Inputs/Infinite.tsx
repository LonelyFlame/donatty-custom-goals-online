'use client';

import { useEffect } from 'react';
import { Form } from 'antd';

import HintedSwitch from '@/components/ui/HintedSwitch';
import translations from '@/translations';
import type { TWidgetClockFormData } from '@/types/forms';

const { forms: t } = translations;

const Infinite = () => {
  const form = Form.useFormInstance<TWidgetClockFormData>();
  const half = Form.useWatch('half', form);
  const goalSecondary = Form.useWatch('goalSecondary', form);
  const disabled = !!half || !!goalSecondary;

  const { setFieldValue } = form;
  useEffect(() => {
    if (!disabled) return;

    setFieldValue('infinite', false);
  }, [disabled, setFieldValue]);

  return (
    <HintedSwitch
      label={t.infinite.label}
      hint={t.infinite.hint}
      disabled={disabled}
      name="infinite"
    />
  );
};

export default Infinite;
