import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { PropsWithChildren } from 'react';

const Hint = ({ children }: PropsWithChildren) => {
  return (
    <Popover content={children}>
      <InfoCircleOutlined />
    </Popover>
  );
};

export default Hint;
