import { Col, Row } from 'antd';

import Preview from '@/components/common/Preview';
import WidgetLink from '@/components/ui/WidgetLink';

import Inputs from '../Inputs';

interface Props {
  slug?: string;
}

const Clock = ({ slug }: Props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={10}>
          {!!slug && <WidgetLink slug={slug} />}
          <Inputs />
        </Col>
        <Col span={14}>
          <Preview type="clock" variant="square" />
        </Col>
      </Row>
    </div>
  );
}

export default Clock;
