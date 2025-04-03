'use client';

import { useEffect } from 'react';
import { Switch, Form } from 'antd';

import Hint from '../../../../../../components/ui/Hint';
import FormItem from '../../../../../../components/ui/FormItem';
import translations from '../../../../../../translations';
import type { TWidgetClockFormData } from '../../../../../../types/forms';

import styles from './ClockInputs.module.scss';

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
    <FormItem label={t.infinite.label} className={styles.checkWithHint}>
      <FormItem name="infinite">
        <Switch disabled={disabled} />
      </FormItem>
      <Hint>
        {t.infinite.hint}
      </Hint>
    </FormItem>
  );
};

export default Infinite;
