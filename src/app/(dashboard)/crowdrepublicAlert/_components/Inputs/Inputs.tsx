import { Col, Row, ColorPicker, Input, InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import CRProjectInput from '@/components/ui/CRProjectInput';
import Name from '@/components/ui/Name';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import LabelTemplatePopover from './LabelTemplatePopover';

const { forms: t } = translations;

const labelTemplatePopover = <LabelTemplatePopover />;

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
          <FormItem
            name="text"
            label={t.labelAlertTemplate.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <Input
              placeholder={t.labelAlertTemplate.placeholder}
              addonAfter={labelTemplatePopover}
            />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={5}>
          <FormItem
            name="color"
            label={t.colorLabel.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={19}>
          <FormItem
            name="delay"
            label={t.alertVisibility.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber />
          </FormItem>
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
