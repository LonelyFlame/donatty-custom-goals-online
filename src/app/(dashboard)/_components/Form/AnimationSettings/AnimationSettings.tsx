'use client';

import { useEffect } from 'react';
import { Col, Form, Input, InputNumber, Row, Space } from 'antd';

import translations from '@/translations';
import type { TWidgetFormData } from '@/types/forms';
import { LIQUID_DEFAULT_ANIMATION_DURATION, LIQUID_DEFAULT_ANIMATION_FUNCTION } from '@/constants/widgets';

import AnimationFunctionHint from './AnimationFunctionHint';
import styles from './AnimationSettings.module.scss';

const { forms: t } = translations;

const AnimationSettings = () => {
  const form = Form.useFormInstance<TWidgetFormData>();
  const isLiquid = Form.useWatch('liquid', form);
  const animationFunction = Form.useWatch('animationFunction', form);
  const animationDuration = Form.useWatch('animationDuration', form);

  const { setFieldValue } = form;
  useEffect(() => {
    let newAnimationFunction = animationFunction;
    if (isLiquid && !animationFunction) {
      newAnimationFunction = LIQUID_DEFAULT_ANIMATION_FUNCTION;
    } else if (!isLiquid && animationFunction === LIQUID_DEFAULT_ANIMATION_FUNCTION) {
      newAnimationFunction = undefined;
    }

    if (animationFunction !== newAnimationFunction) {
      setFieldValue('animationFunction', newAnimationFunction);
    }
  }, [setFieldValue, isLiquid, animationFunction]);

  useEffect(() => {
    let newAnimationDuration = animationDuration;
    if (isLiquid && !animationDuration) {
      newAnimationDuration = LIQUID_DEFAULT_ANIMATION_DURATION;
    } else if (!isLiquid && animationDuration === LIQUID_DEFAULT_ANIMATION_DURATION) {
      newAnimationDuration = undefined;
    }

    if (animationDuration !== newAnimationDuration) {
      setFieldValue('animationDuration', newAnimationDuration);
    }
  }, [setFieldValue, isLiquid, animationDuration]);

  return (
    <Row gutter={16}>
      <Col span={18}>
        <Form.Item name="animationFunction" label={t.animationFunction.label}>
          <Space.Compact block>
            <Input placeholder={t.animationFunction.placeholder} />
            <Space.Addon>
              <AnimationFunctionHint />
            </Space.Addon>
          </Space.Compact>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="animationDuration" label={t.animationDuration.label}>
          <InputNumber className={styles.duration} placeholder={t.animationDuration.placeholder} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AnimationSettings;
