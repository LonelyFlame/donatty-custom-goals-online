'use client';

import { useEffect } from 'react';
import { Col, Form, Input, InputNumber, Row } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import type { TWidgetFormData } from '@/types/forms';
import { LIQUID_DEFAULT_ANIMATION_DURATION, LIQUID_DEFAULT_ANIMATION_FUNCTION } from '@/constants/widgets';

import AnimationFunctionHint from './AnimationFunctionHint';
import styles from './AnimationSettings.module.scss';

const { forms: t } = translations;

const hintFunction = <AnimationFunctionHint />;

const AnimationSettings = () => {
  const form = Form.useFormInstance<TWidgetFormData>();
  const isLiquid = Form.useWatch('liquid', form);
  const animationFunction = Form.useWatch('animationFunction', form);
  const animationDuration = Form.useWatch('animationDuration', form);

  const { setFieldValue } = form;
  useEffect(() => {
    if (isLiquid && !animationFunction) {
      setFieldValue('animationFunction', LIQUID_DEFAULT_ANIMATION_FUNCTION);
    } else if (!isLiquid && animationFunction === LIQUID_DEFAULT_ANIMATION_FUNCTION) {
      setFieldValue('animationFunction', undefined);
    }

    if (isLiquid && !animationDuration) {
      setFieldValue('animationDuration', LIQUID_DEFAULT_ANIMATION_DURATION);
    } else if (!isLiquid && animationDuration === LIQUID_DEFAULT_ANIMATION_DURATION) {
      setFieldValue('animationDuration', undefined);
    }
  }, [setFieldValue, isLiquid, animationFunction, animationDuration]);

  return (
    <Row gutter={16}>
      <Col span={18}>
        <FormItem name="animationFunction" label={t.animationFunction.label}>
          <Input placeholder={t.animationFunction.placeholder} addonAfter={hintFunction} />
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem name="animationDuration" label={t.animationDuration.label}>
          <InputNumber className={styles.duration} placeholder={t.animationDuration.placeholder} />
        </FormItem>
      </Col>
    </Row>
  );
};

export default AnimationSettings;
