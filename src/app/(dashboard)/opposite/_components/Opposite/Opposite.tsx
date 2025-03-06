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
          {!!slug && <WidgetLink type="opposite" slug={slug} />}
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
