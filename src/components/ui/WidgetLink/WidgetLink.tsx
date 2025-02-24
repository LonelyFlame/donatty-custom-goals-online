'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Input, Space, Button, Tooltip } from 'antd';
import { CopyOutlined, CheckCircleFilled } from '@ant-design/icons';

import { template } from '@/utils/strings';
import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import type { WidgetTypes } from '@/types/widgets';

import { MAP_TYPE_TO_ROUTE } from './constants';
import styles from './WidgetLink.module.scss';

interface Props {
  type: WidgetTypes;
}

const copyIcon = <CopyOutlined />;
const checkIcon = <CheckCircleFilled className={styles.successIcon} />;

const { components: { widgetLink: t } } = translations;

const WidgetLink = ({ type }: Props) => {
  const { slug } = useParams<{ slug: string }>();

  const [showSuccess, setShowSuccess] = useState(false);

  const timeoutRef = useRef<number>(undefined);

  if (!slug || !window) return null;

  const origin = window.location.origin;
  const route = template(MAP_TYPE_TO_ROUTE[type], { slug });
  const link = `${origin}${route}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);

    setShowSuccess(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  return (
    <FormItem label={t.label}>
      <Space.Compact className={styles.space}>
        <Input.Password value={link} readOnly />
        <Tooltip
          title={
            <div className={styles.success}>
              {checkIcon}
              {t.success}
            </div>
          }
          placement="right"
          arrow={false}
          open={showSuccess}
          rootClassName={styles.tooltip}
        >
          <Button icon={copyIcon} onClick={handleCopy} />
        </Tooltip>
      </Space.Compact>
    </FormItem>
  );
};

export default WidgetLink;
