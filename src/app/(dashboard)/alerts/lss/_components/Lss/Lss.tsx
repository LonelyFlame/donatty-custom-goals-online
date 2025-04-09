import { Col, Row } from 'antd';

import Preview from '@/components/common/Preview';
import WidgetLink from '@/components/ui/WidgetLink';

import Inputs from '../Inputs';
import Note from './Note';

interface Props {
  slug?: string;
}

const Lss = ({ slug }: Props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          {!!slug && <WidgetLink slug={slug} />}
          <Inputs />
        </Col>
        <Col span={12}>
          <Preview type="lss" variant="rectangle" />

          <Note />
        </Col>
      </Row>
    </div>
  );
}

export default Lss;
