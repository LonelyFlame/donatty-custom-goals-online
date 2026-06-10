'use client';

import { Form, Space, Input } from 'antd';

import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { forms: { labelTemplate: t } } = translations;

const LabelTemplate = () => {
  return (
    <Form.Item label={t.label}>
      <Space.Compact block>
        <Form.Item name="text" style={{ margin: 0, width: '100%' }}>
          <Input placeholder={t.placeholder.cr} />
        </Form.Item>

        <Space.Addon>
          <Hint>
            <ul>
              <li><b>{'{amount}'}</b> — {t.hintCR.amount}</li>
              <li><b>{'{leverage}'}</b> — {t.hintCR.leverage}</li>
              <li><b>{'{percentage}'}</b> — {t.hintCR.percentage}</li>
            </ul>
          </Hint>
        </Space.Addon>
      </Space.Compact>
    </Form.Item>
  );
};

export default LabelTemplate;
