import { Col, Row, Divider } from 'antd';

import Hint from '@/components/ui/Hint';
import HintedSwitch from '@/components/ui/HintedSwitch';
import Leverage from '@/components/ui/Leverage';
import WidgetInput from '@/components/ui/WidgetInput';
import ImageUpload from '@/components/ui/ImageUpload';
import translations from '@/translations';

import { AnimationSettings, TopInputs } from '@/app/(dashboard)/_components/Form';

import Infinite from './Infinite';
import styles from './ClockInputs.module.scss';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <AnimationSettings />

      <Row gutter={16}>
        <Col span={5}>
          <HintedSwitch label={t.half.label} hint={t.half.hint} name="half" />
        </Col>
        <Col span={6}>
          <Infinite />
        </Col>

        <Col span={13}>
          <Leverage />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <ImageUpload label={t.image.label} name="image" required />
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
                  {t.leverage.hintOptionalNegativeClock}
                </li>
              </ul>
            </Hint>
          </Divider>

          <WidgetInput widgetType="GOAL" name="goalSecondary" />
        </Col>

        <Col span={12}>
          <Divider className={styles.divider}>
            {t.leverage.positive}
          </Divider>

          <WidgetInput widgetType="GOAL" name="goal" required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
