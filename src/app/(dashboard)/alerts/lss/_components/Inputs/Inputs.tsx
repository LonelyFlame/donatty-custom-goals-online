import { Col, Row, ColorPicker, Select, InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import WidgetInput from '@/components/ui/WidgetInput';
import Name from '@/components/ui/Name';
import HintedSwitch from '@/components/ui/HintedSwitch';
import ColorsPreview from '@/components/common/ColorsPreview';
import translations from '@/translations';
import Font from '../../../../../../components/ui/Font';

import { VARIANTS_OPTIONS } from './constants';
import LifetimePopover from './LifetimePopover';

const { forms: t } = translations;

const COLOR_PREVIEW_DOMAIN: number[] = [0, 0.01, 1];

const lifetimePopover = <LifetimePopover />;

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
          <FormItem
            name="leverage"
            label={t.maxValue.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber placeholder={t.maxValue.placeholder}/>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            name="timer"
            label={t.lifetime.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <InputNumber placeholder={t.lifetime.placeholder} addonAfter={lifetimePopover} />
          </FormItem>
        </Col>
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
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <FormItem
            name="color"
            label={t.colorEmpty.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            name="colorSecondary"
            label={t.colorMin.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            name="colorTertiary"
            label={t.colorMax.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            name="variant"
            label={t.plot.label}
            rules={[{ required: true, message: t.validation.required }]}

          >
            <Select options={VARIANTS_OPTIONS} />
          </FormItem>
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
