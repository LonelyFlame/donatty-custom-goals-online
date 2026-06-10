'use client';

import { Col, Row, ColorPicker, Input, InputNumber, Space, Form } from 'antd';

import CRProjectInput from '@/components/ui/CRProjectInput';
import Name from '@/components/ui/Name';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import LabelTemplatePopover from './LabelTemplatePopover';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={10}>
          <Name />
        </Col>
        <Col span={14}>
          <Font />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={t.labelAlertTemplate.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <Space.Compact block>
              <Form.Item
                name="text"
                style={{ margin: 0, width: '100%' }}
                rules={[{ required: true, message: t.validation.required }]}
              >
                <Input placeholder={t.labelTemplate.placeholder.cr} />
              </Form.Item>

              <Space.Addon>
                <LabelTemplatePopover />
              </Space.Addon>
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={5}>
          <Form.Item
            name="color"
            label={t.colorLabel.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>
        <Col span={19}>
          <Form.Item
            name="delay"
            label={t.alertVisibility.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber />
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
