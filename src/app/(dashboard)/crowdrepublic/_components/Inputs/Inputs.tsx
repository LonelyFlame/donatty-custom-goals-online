'use client';

import { Col, Row, ColorPicker, Input, Select, Space, Form } from 'antd';

import CRProjectInput from '@/components/ui/CRProjectInput';
import Name from '@/components/ui/Name';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import LabelTemplatePopover from './LabelTemplatePopover';
import { VARIANTS_OPTIONS } from './constants';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={7}>
          <Name />
        </Col>
        <Col span={7}>
          <Form.Item name="variant" label={t.crGoal.label}>
            <Select options={VARIANTS_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Font />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="text" label={t.labelTemplate.label}>
            <Space.Compact block>
              <Input placeholder={t.labelTemplate.placeholder} />

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
            name="colorTertiary"
            label={t.colorLabel.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="colorSecondary"
            label={t.colorGoals.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CRProjectInput name="project" required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
