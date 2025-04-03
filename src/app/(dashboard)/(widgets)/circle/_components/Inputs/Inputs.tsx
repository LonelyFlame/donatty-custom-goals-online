import { Col, Row, Switch, Divider } from 'antd';

import Hint from '../../../../../../components/ui/Hint';
import FormItem from '../../../../../../components/ui/FormItem';
import Leverage from '../../../../../../components/ui/Leverage';
import Goal from '../../../../../../components/ui/Goal';
import ImageUpload from '../../../../../../components/ui/ImageUpload';
import translations from '../../../../../../translations';

import { TopInputs } from '../../../../_components/Form';

import ImageSecondary from './ImageSecondary';
import styles from './CircleInputs.module.scss';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <Row gutter={16}>
        <Col span={5}>
          <FormItem label={t.half.label} className={styles.checkWithHint}>
            <FormItem name="half">
              <Switch />
            </FormItem>
            <Hint>
              {t.half.hint}
            </Hint>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label={t.rotate.label} className={styles.checkWithHint}>
            <FormItem name="rotate">
              <Switch />
            </FormItem>
            <Hint>
              {t.rotate.hint}
            </Hint>
          </FormItem>
        </Col>

        <Col span={13}>
          <Leverage />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Divider className={styles.divider}>
            {t.leverage.negative}
            <Hint>
              <ul>
                <li>
                  {t.leverage.hintOptionalNegative}
                </li>
                <li>
                  {t.leverage.hintOptionalNegativeCircle}
                </li>
              </ul>
            </Hint>
          </Divider>

          <ImageSecondary />

          <Goal name="goalSecondary" />
        </Col>

        <Col span={12}>
          <Divider className={styles.divider}>
            {t.leverage.positive}
          </Divider>

          <ImageUpload label={t.image.label} name="image" required />

          <Goal required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
