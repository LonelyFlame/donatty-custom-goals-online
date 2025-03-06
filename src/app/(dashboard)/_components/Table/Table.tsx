'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Table as AntdTable, Tag, Input, Row, Col, Button } from 'antd';
import type { ChangeEvent } from 'react';
import type { TableColumnsType } from 'antd';

import { template } from '@/utils/strings';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import { MAP_TYPE_TO_ICON_COMPONENT, MAP_TYPE_TO_TITLE } from '@/constants/widgets';
import translations from '@/translations';
import type { TGoal } from '@/types/entities';
import type { TWidgetType } from '@/types/widgets';

import Actions from './Actions';

interface Props {
  data: TGoal[];
}

const { pages: { dashboard: t } } = translations;

const columns: TableColumnsType<TGoal> = [
  {
    key: 'name',
    dataIndex: 'name',
    title: t.table.columns.name,
    render: (_, { slug, name, type }: TGoal) => {
      const route = MAP_TYPE_TO_MANAGE_ROUTE[type];

      return <Link href={template(route, { slug })}>{name}</Link>;
    },
  },
  {
    key: 'type',
    title: t.table.columns.type,
    dataIndex: 'type',
    width: '20%',
    render: (type: TWidgetType) => {
      const IconComponent = MAP_TYPE_TO_ICON_COMPONENT[type];
      const label = MAP_TYPE_TO_TITLE[type];

      return (
        <Tag icon={<IconComponent />}>
          {label}
        </Tag>
      );
    },
  },
  {
    key: 'action',
    title: '',
    width: '10%',
    render: (_, { type, slug }) => {
      return <Actions type={type} slug={slug} />
    },
  },
];

const Table = ({ data }: Props) => {
  const [filerName, setFilerName] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilerName(value);
  };

  const handleRowSelectionChange = (selectedKeys: unknown[]) => {
    setSelectedRowKeys(selectedKeys.map(String));
  }

  const filteredData = useMemo<TGoal[]>(() => {
    if (!filerName) return data;

    return data.filter(({ name }) => name.includes(filerName));
  }, [filerName, data]);

  return (
    <div>
      <Row gutter={16} justify="space-between">
        <Col span={12}>
          <Input addonBefore={t.filter.name} onChange={handleChangeFilter} allowClear />
        </Col>
        <Col>
          {!!selectedRowKeys.length && (
            <Button type="primary" danger disabled>
              {t.table.actions.deleteSelected}
            </Button>
          )}
        </Col>
      </Row>
      <br />
      <AntdTable<TGoal>
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelectionChange,
        }}
        rowKey="slug"
      />
    </div>
  );
}

export default Table;
