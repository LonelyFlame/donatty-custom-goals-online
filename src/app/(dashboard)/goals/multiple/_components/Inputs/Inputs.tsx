import { Col, Row, ColorPicker, Divider, InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import WidgetInput from '@/components/ui/WidgetInput';
import ImageUpload from '@/components/ui/ImageUpload';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import { TopInputs, AnimationSettings } from '@/app/(dashboard)/_components/Form';
import LabelTemplate from './LabelTemplate';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <AnimationSettings />

      <Row gutter={16}>
        <Col span={14}>
          <LabelTemplate />
        </Col>

        <Col span={10}>
          <Font />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <FormItem
            label={t.multiple.goalTarget} name="leverage"
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem
            name="color"
            label={t.color.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem
            name="colorSecondary"
            label={t.colorLabel.label}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <ImageUpload label={t.image.label} name="image" />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Divider>
            {t.multiple.active}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goal" required multiple />

          <div dangerouslySetInnerHTML={{ __html: t.multiple.noteActive }} />
        </Col>

        <Col span={12}>
          <Divider>
            {t.multiple.passive}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goalSecondary" multiple />

          <div dangerouslySetInnerHTML={{ __html: t.multiple.notePassive }} />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
