import { Col, Row, ColorPicker, Divider, Form, Space, InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import WidgetInput from '@/components/ui/WidgetInput';
import ImageUpload from '@/components/ui/ImageUpload';
import translations from '@/translations';

import { TopInputs, AnimationSettings } from '@/app/(dashboard)/_components/Form';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <AnimationSettings />

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
          <ImageUpload label={t.image.label} name="image" required />
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
