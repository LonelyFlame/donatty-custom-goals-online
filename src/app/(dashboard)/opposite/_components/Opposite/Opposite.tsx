import { Col, Row } from 'antd';

import Preview from '@/components/common/Preview';
import WidgetLink from '@/components/ui/WidgetLink';

import Inputs from '../Inputs';

const Opposite = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={10}>
          <WidgetLink type="opposite" />
          <Inputs />
        </Col>
        <Col span={14}>
          <Preview />
        </Col>
      </Row>
    </div>
  );
}

export default Opposite;
