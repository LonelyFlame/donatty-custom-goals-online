import { Col, Row, ColorPicker, Switch, Divider } from 'antd';

import FormItem from '@/components/ui/FormItem';
import Leverage from '@/components/ui/Leverage';
import WidgetInput from '@/components/ui/WidgetInput';
import ImageUpload from '@/components/ui/ImageUpload';
import translations from '@/translations';

import { TopInputs, AnimationSettings } from '@/app/(dashboard)/_components/Form';

import Bubbles from './Bubbles';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <AnimationSettings />

      <Row gutter={16}>
        <Col span={10}>
          <Leverage />
        </Col>

        <Col span={14}>
          <Row gutter={16}>
            <Col span={11}>
              <FormItem name="liquid" label={t.liquid.label}>
                <Switch />
              </FormItem>
            </Col>
            <Col span={13}>
              <Bubbles />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Divider>
            {t.leverage.negative}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goalSecondary" />

          <FormItem
            name="colorSecondary"
            label={t.color.label}
          >
            <ColorPicker showText />
          </FormItem>

          <ImageUpload label={t.image.label} name="imageSecondary" />
        </Col>

        <Col span={12}>
          <Divider>
            {t.leverage.positive}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goal" required />

          <FormItem
            name="color"
            label={t.color.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>

          <ImageUpload label={t.image.label} name="image" />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
