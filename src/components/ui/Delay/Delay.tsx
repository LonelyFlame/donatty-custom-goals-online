'use client';

import { InputNumber, Space, Form } from 'antd';

import translations from '@/translations';

import Popover from './Popover';

const { components: { delay: t } } = translations;

const Delay = () => {
  return (
    <Form.Item label={t.label}>
      <Space.Compact block>
        <Form.Item name="timer" style={{ margin: 0, width: '100%' }}>
          <InputNumber placeholder={t.placeholder}/>
        </Form.Item>

        <Space.Addon>
          <Popover />
        </Space.Addon>
      </Space.Compact>
    </Form.Item>
  );
};

export default Delay;
