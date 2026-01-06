'use client';

import { Col, Row, ColorPicker, Select, InputNumber, Space, Form } from 'antd';

import WidgetInput from '@/components/ui/WidgetInput';
import Name from '@/components/ui/Name';
import HintedSwitch from '@/components/ui/HintedSwitch';
import ColorsPreview from '@/components/common/ColorsPreview';
import Font from '@/components/ui/Font';
import translations from '@/translations';

import { VARIANTS_OPTIONS } from './constants';
import LifetimePopover from './LifetimePopover';
import ValueOverflowPopover from './ValueOverflowPopover';

const { forms: t } = translations;

const COLOR_PREVIEW_DOMAIN: number[] = [0, 0.01, 1];

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
        <Col span={6}>
          <Form.Item
            name="leverage"
            label={t.maxValue.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber placeholder={t.maxValue.placeholder}/>
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item
            label={t.valueOverflow.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <Space.Compact block>
              <Form.Item
                name="leverageSecondary"
                style={{ margin: 0, width: '100%'}}
                rules={[{ required: true, message: t.validation.required }]}
              >
                <InputNumber placeholder={t.valueOverflow.placeholder} />
              </Form.Item>

              <Space.Addon>
                <ValueOverflowPopover />
              </Space.Addon>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={t.lifetime.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <Space.Compact block>
              <Form.Item
                name="timer"
                style={{ margin: 0, width: '100%'}}
                rules={[{ required: true, message: t.validation.required }]}
              >
                <InputNumber placeholder={t.lifetime.placeholder} />
              </Form.Item>

              <Space.Addon>
                <LifetimePopover />
              </Space.Addon>
            </Space.Compact>
          </Form.Item>
        </Col>

        <Col span={5} />
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <HintedSwitch label={t.fade.label} hint={t.fade.hint} name="fade" />
        </Col>

        <Col span={6}>
          <HintedSwitch
            hint={<>{t.sfx.hint.beeps}<br />{t.sfx.hint.death}</>}
            label={t.sfx.label}
            name="sfx"
          />
        </Col>

        <Col span={12} />
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="color"
            label={t.colorEmpty.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="colorSecondary"
            label={t.colorMin.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="colorTertiary"
            label={t.colorMax.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="variant"
            label={t.plot.label}
            rules={[{ required: true, message: t.validation.required }]}

          >
            <Select options={VARIANTS_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>

      <ColorsPreview domain={COLOR_PREVIEW_DOMAIN} />

      <br />

      <Row gutter={16}>
        <Col span={24}>
          <WidgetInput widgetType="ALERT" name="alert" required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
