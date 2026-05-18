'use client';

import { Col, Row, ColorPicker, Input, Space, Form, InputNumber } from 'antd';

import BoostyInput from '@/components/ui/BoostyInput';
import Name from '@/components/ui/Name';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import LabelTemplatePopover from './LabelTemplatePopover';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={7}>
          <Name />
        </Col>

        <Col span={10}>
          <Font />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label={t.labelTemplate.label}>
            <Space.Compact block>
              <Form.Item name="text" style={{ margin: 0, width: '100%' }}>
                <Input placeholder={t.labelTemplate.placeholder.boostyCount} />
              </Form.Item>

              <Space.Addon>
                <LabelTemplatePopover />
              </Space.Addon>
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={7}>
          <Form.Item
            name="color"
            label={t.colorFunded.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item
            name="colorSecondary"
            label={t.colorLabel.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            rules={[{ required: true, message: t.validation.required }]}
            style={{ margin: 0, width: '100%' }}
            label={t.boostyGoal.label}
            name='leverage'>
            <InputNumber style={{ width: '100%' }} placeholder={t.boostyGoal.placeholder} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <BoostyInput />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
