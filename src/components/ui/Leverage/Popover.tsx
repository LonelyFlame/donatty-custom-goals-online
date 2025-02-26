import { Popover as AntdPopover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import PopoverContent from './PopoverContent';

const content = <PopoverContent />;

const Popover = () => {
  return (
    <AntdPopover content={content}>
      <InfoCircleOutlined />
    </AntdPopover>
  );
};

export default Popover;
