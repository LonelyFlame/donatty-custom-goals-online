import { Col, Row, ColorPicker, Switch, Select, Divider } from 'antd';

import FormItem from '@/components/ui/FormItem';
import Leverage from '@/components/ui/Leverage';
import WidgetInput from '@/components/ui/WidgetInput';
import ColorsPreview from '@/components/common/ColorsPreview';
import translations from '@/translations';

import { TopInputs } from '@/app/(dashboard)/_components/Form';
import { VARIANTS_OPTIONS } from './constants';

const { forms: t } = translations;

const COLOR_PREVIEW_DOMAIN: number[] = [0, 0.99, 1];

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <Row gutter={16}>
        <Col span={10}>
          <Leverage />
        </Col>

        <Col span={14}>
          <Row gutter={16}>
            <Col span={9}>
              <FormItem name="fade" label={t.fade.label}>
                <Switch />
              </FormItem>
            </Col>
            <Col span={15}>
              <FormItem
                name="variant"
                label={t.plot.label}
                rules={[{ required: true, message: t.validation.required }]}

              >
                <Select options={VARIANTS_OPTIONS} />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <FormItem
            name="color"
            label={t.colorMin.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            name="colorSecondary"
            label={t.colorMax.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            name="colorTertiary"
            label={t.colorFull.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
      </Row>

      <ColorsPreview domain={COLOR_PREVIEW_DOMAIN} />

      <Row gutter={16}>
        <Col span={12}>
          <Divider>
            {t.leverage.negative}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goalSecondary" />
        </Col>

        <Col span={12}>
          <Divider>
            {t.leverage.positive}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goal" required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
