'use client';

import { Row, Col, Select, InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import { FONTS } from '@/constants/theme';
import translations from '@/translations';

const { components: { font: tFont, fontSize: tFontSize } } = translations;

const options = FONTS.map(({ slug, name }) => ({ name, value: slug, label: <div style={{ fontFamily: name }}>{name}</div> }));

const Font = () => {
  return (
    <Row gutter={16}>
      <Col span={14}>
        <FormItem name="font" label={tFont.label}>
          <Select
            filterSort={(optionA, optionB) =>
              (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
            }
            options={options}
            placeholder={tFont.placeholder}
            optionFilterProp="name"
            defaultValue="roboto"
            showSearch
          />
        </FormItem>
      </Col>
      <Col span={10}>
        <FormItem name="fontSize" label={tFontSize.label}>
          <InputNumber />
        </FormItem>
      </Col>
    </Row>
  );
};

export default Font;
