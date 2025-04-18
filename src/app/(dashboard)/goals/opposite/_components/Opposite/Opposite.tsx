import { Col, Row } from 'antd';

import Preview from '@/components/common/Preview';
import WidgetLink from '@/components/ui/WidgetLink';

import Inputs from '../Inputs';

interface Props {
  slug?: string;
}

const Opposite = ({ slug }: Props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={10}>
          {!!slug && <WidgetLink slug={slug} type="goal" />}
          <Inputs />
        </Col>
        <Col span={14}>
          <Preview type="opposite" />
        </Col>
      </Row>
    </div>
  );
}

export default Opposite;
