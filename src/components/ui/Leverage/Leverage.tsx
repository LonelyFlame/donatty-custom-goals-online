'use client';

import { InputNumber, Space, Form } from 'antd';

import translations from '@/translations'

import Popover from './Popover';
import styles from './Leverage.module.scss';

interface Props {
  name?: string;
}

const { components: { leverage: t } } = translations;

const Leverage = ({ name = 'leverage' }: Props) => {
  return (
    <Form.Item name={name} label={t.label}>
      <Space.Compact block>
        <InputNumber
          className={styles.leverage}
          placeholder={t.placeholder}
        />
        <Space.Addon>
          <Popover />
        </Space.Addon>
      </Space.Compact>
    </Form.Item>
  );
};

export default Leverage;
