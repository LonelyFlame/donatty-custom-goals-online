'use client';

import { useState, useRef } from 'react';
import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import useWidgetLink from '@/hooks/useWidgetLink';
import FormItem from '@/components/ui/FormItem';
import BlurredInput from '@/components/ui/BlurredInput';
import SuccessTooltip from '@/components/ui/SuccessTooltip';
import translations from '@/translations';
import type { TWidgetType } from '@/types/widgets';

interface Props {
  type: TWidgetType;
  slug: string;
}

const copyIcon = <CopyOutlined />;

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
        <SuccessTooltip title={t.success} open={showSuccess}>
          <Button icon={copyIcon} onClick={handleCopy} />
        </SuccessTooltip>
      </BlurredInput>
    </FormItem>
  );
};

export default WidgetLink;
