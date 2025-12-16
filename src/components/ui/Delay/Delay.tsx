'use client';

import { InputNumber, Space, Form } from 'antd';

import translations from '@/translations';

import Popover from './Popover';

const { components: { delay: t } } = translations;

const Delay = () => {
  return (
    <Form.Item name="timer" label={t.label}>
      <Space.Compact block>
        <InputNumber placeholder={t.placeholder}/>

        <Space.Addon>
          <Popover />
        </Space.Addon>
      </Space.Compact>
    </Form.Item>
  );
};

export default Delay;
