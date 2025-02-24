'use client';

import { Form } from 'antd';
import type { FormItemProps } from 'antd';

const FormItem = (props: FormItemProps) => {
  return <Form.Item {...props} />;
};

export default FormItem;
