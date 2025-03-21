'use client';

import { useState, useRef } from 'react';
import { Button, Tooltip } from 'antd';
import { CopyOutlined, CheckCircleFilled } from '@ant-design/icons';

import useWidgetLink from '@/hooks/useWidgetLink';
import FormItem from '@/components/ui/FormItem';
import BlurredInput from '@/components/ui/BlurredInput';
import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';

import styles from './WidgetLink.module.scss';

interface Props {
  type: TWidgetType;
  slug: string;
}

const copyIcon = <CopyOutlined />;
const checkIcon = <CheckCircleFilled className={styles.successIcon} />;

const { components: { widgetLink: t } } = translations;

const WidgetLink = ({ type, slug }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const timeoutRef = useRef<number|undefined>(undefined);

  const widgetLink = useWidgetLink(type, slug);

  const handleCopy = async () => {
    await widgetLink.copy();

    setShowSuccess(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  return (
    <FormItem label={t.label}>
      <BlurredInput
        value={widgetLink.link}
        readOnly
      >
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
      </BlurredInput>
    </FormItem>
  );
};

export default WidgetLink;
