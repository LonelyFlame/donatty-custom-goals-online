import { Col, Row } from 'antd';

import Preview from '@/components/common/Preview';
import WidgetLink from '@/components/ui/WidgetLink';

import Inputs from '../Inputs';

interface Props {
  slug?: string;
}

const CrAlert = ({ slug }: Props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          {!!slug && <WidgetLink slug={slug} type="crAlert" />}
          <Inputs />
        </Col>
        <Col span={12}>
          <Preview type="crAlert" variant="square" />
        </Col>
      </Row>
    </div>
  );
}

export default CrAlert;
