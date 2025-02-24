import { Col, Row } from 'antd';

import Inputs from './Inputs';
import WidgetLink from '@/components/ui/WidgetLink';

const Opposite = () => {
  return (
    <div>
      <Row>
        <Col span={10}>
          <WidgetLink type="opposite" />
          <Inputs />
        </Col>
        <Col span={14}>

        </Col>
      </Row>
    </div>
  );
}

export default Opposite;
