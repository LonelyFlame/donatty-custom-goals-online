import { Col, Row, Divider } from 'antd';

import Hint from '@/components/ui/Hint';
import Leverage from '@/components/ui/Leverage';
import WidgetInput from '@/components/ui/WidgetInput';
import ImageUpload from '@/components/ui/ImageUpload';
import HintedSwitch from '@/components/ui/HintedSwitch';
import translations from '@/translations';

import { TopInputs } from '@/app/(dashboard)/_components/Form';

import ImageSecondary from './ImageSecondary';
import styles from './CircleInputs.module.scss';

const { forms: t } = translations;

const Inputs = () => {
  return (
    <>
      <TopInputs />

      <Row gutter={16}>
        <Col span={5}>
          <HintedSwitch
            label={t.half.label}
            hint={t.half.hint}
            name="half"
          />
        </Col>
        <Col span={6}>
          <HintedSwitch
            label={t.rotate.label}
            hint={t.rotate.hint}
            name="rotate"
          />
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

          <WidgetInput widgetType="GOAL" name="goalSecondary" />
        </Col>

        <Col span={12}>
          <Divider className={styles.divider}>
            {t.leverage.positive}
          </Divider>

          <ImageUpload label={t.image.label} name="image" required />

          <WidgetInput widgetType="GOAL" name="goal" required />
        </Col>
      </Row>
    </>
  );
};

export default Inputs;
