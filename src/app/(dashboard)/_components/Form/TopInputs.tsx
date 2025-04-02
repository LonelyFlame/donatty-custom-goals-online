import { Col, Row } from 'antd';

import Name from '@/components/ui/Name';
import Delay from '@/components/ui/Delay';

const TopInputs = () => {
  return (
    <Row gutter={16}>
      <Col span={18}>
        <Name />
      </Col>
      <Col span={6}>
        <Delay />
      </Col>
    </Row>
  );
};

export default TopInputs;
