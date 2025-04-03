import { Col, Row, ColorPicker, Switch, Divider, } from 'antd';

import FormItem from '../../../../../../components/ui/FormItem';
import Leverage from '../../../../../../components/ui/Leverage';
import Goal from '../../../../../../components/ui/Goal';
import translations from '../../../../../../translations';

import { TopInputs } from '../../../../_components/Form';

import Bubbles from './Bubbles';

const { forms: t } = translations;

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

          <Goal name="goalSecondary" required />

          <FormItem
            name="colorSecondary"
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

          <Goal required />

          <FormItem
            name="color"
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
