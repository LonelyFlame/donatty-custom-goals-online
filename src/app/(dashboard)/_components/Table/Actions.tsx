'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'antd';
import { CopyOutlined, EditOutlined, FileAddOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { template } from '@/utils/strings';
import useWidgetLink from '@/hooks/useWidgetLink';
import { MAP_TYPE_TO_MANAGE_ROUTE } from '@/constants/routes';
import { MAP_WIDGET_TYPE_TO_TYPE } from '@/constants/widgets';
import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';

const { pages: { dashboard: { table: { actions: t } } } } = translations;

const copyIcon = <CopyOutlined />;
const editIcon = <EditOutlined />;
const duplicateIcon = <FileAddOutlined />;
const deleteIcon = <DeleteOutlined />;

interface Props {
  widgetType: TWidgetType;
  slug: string;
}

const Actions = ({ widgetType, slug }: Props) => {
  const router = useRouter();

  const type = MAP_WIDGET_TYPE_TO_TYPE[widgetType];
  const widgetLink = useWidgetLink(slug, type);

  const handleEdit = () => {
    const route = template(MAP_TYPE_TO_MANAGE_ROUTE[widgetType], { slug });
    router.push(route);
  };

  const handleCopy = async () => {
    widgetLink.copy();
  };

  const handleDelete = async () => {
    console.log(slug); // eslint-disable-line no-console -- TODO
  };

  const menu: MenuProps = useMemo(() => {
    return {
      items: [
        {
          key: 'copyLink',
          icon: copyIcon,
          label: t.copyLink,
          onClick: handleCopy,
        },
        {
          key: 'edit',
          icon: editIcon,
          label: t.edit,
          onClick: handleEdit,
        },
        {
          key: 'duplicate',
          icon: duplicateIcon,
          label: t.duplicate,
          disabled: true,
        },
        {
          key: 'delete',
          icon: deleteIcon,
          label: t.deleteWidget,
          danger: true,
          disabled: true,
          onClick: handleDelete,
        },
      ],
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dropdown.Button menu={menu} onClick={handleCopy}>
      {copyIcon}
    </Dropdown.Button>
  );
};

export default Actions;
