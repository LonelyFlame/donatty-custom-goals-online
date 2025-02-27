import { Col, Row, Input, ColorPicker, Switch, Divider, } from 'antd';

import FormItem from '@/components/ui/FormItem';
import Leverage from '@/components/ui/Leverage';
import Goal from '@/components/ui/Goal';
import translations from '@/translations';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <FormItem
        name="name"
        label={t.name.label}
        rules={[{ required: true, message: t.name.required }]}
      >
        <Input placeholder={t.name.placeholder} />
      </FormItem>

      <Row gutter={16}>
        <Col span={12}>
          <Leverage />
        </Col>

        <Col span={12}>
          <FormItem name="liquid" label={t.liquid.label}>
            <Switch />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Divider>
            {t.leverage.negative}
          </Divider>

          <Goal required />

          <FormItem
            name="color"
            label={t.color.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>

        <Col span={12}>
          <Divider>
            {t.leverage.positive}
          </Divider>

          <Goal name="goalSecondary" required />

          <FormItem
            name="colorSecondary"
            label={t.color.label}
            rules={[{ required: true, message: t.validation.required }]}
          >
            <ColorPicker showText />
          </FormItem>
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
