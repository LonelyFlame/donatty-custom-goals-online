import { Col, Row, ColorPicker, Input, Select } from 'antd';

import FormItem from '@/components/ui/FormItem';
import CRProjectInput from '@/components/ui/CRProjectInput';
import Name from '@/components/ui/Name';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import LabelTemplatePopover from './LabelTemplatePopover';
import { VARIANTS_OPTIONS } from './constants';

const { forms: t } = translations;

const labelTemplatePopover = <LabelTemplatePopover />;

const Inputs = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={7}>
          <Name />
        </Col>
        <Col span={7}>
          <FormItem name="variant" label={t.crGoal.label}>
            <Select options={VARIANTS_OPTIONS} />
          </FormItem>
        </Col>
        <Col span={10}>
          <Font />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <FormItem name="text" label={t.labelTemplate.label}>
            <Input
              placeholder={t.labelTemplate.placeholder}
              addonAfter={labelTemplatePopover}
            />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={7}>
          <FormItem
            name="color"
            label={t.colorFunded.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={7}>
          <FormItem
            name="colorTertiary"
            label={t.colorLabel.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem
            name="colorSecondary"
            label={t.colorGoals.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
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
