'use client';

import { Row, Col, Select, InputNumber, Form } from 'antd';

import { FONTS } from '@/constants/theme';
import translations from '@/translations';

const { components: { font: tFont, fontSize: tFontSize } } = translations;

const options = FONTS.map(({ slug, name }) => ({ name, value: slug, label: <div style={{ fontFamily: name }}>{name}</div> }));

const Font = () => {
  return (
    <Row gutter={16}>
      <Col span={14}>
        <Form.Item name="font" label={tFont.label} initialValue="roboto">
          <Select
            filterSort={(optionA, optionB) =>
              (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
            }
            options={options}
            placeholder={tFont.placeholder}
            optionFilterProp="name"
            showSearch
          />
        </Form.Item>
      </Col>
      <Col span={10}>
        <Form.Item name="fontSize" label={tFontSize.label}>
          <InputNumber />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Font;
