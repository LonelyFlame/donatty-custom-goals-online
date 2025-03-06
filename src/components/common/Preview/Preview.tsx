'use client';

import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { template } from '@/utils/strings';
import { ROUTES } from '@/constants/routes';
import translations from '@/translations';
import type { TWidget } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

import styles from './Preview.module.scss';

const reloadIcon = <ReloadOutlined />;

const { components: { preview: t } } = translations;

const Preview = () => {
  const [src, setSrc] = useState('');

  const form = Form.useFormInstance<TWidgetFormData>();

  const handleRefresh = () => {
    const { color, colorSecondary, bubblesColor, ...fields } = form.getFieldsValue();
    const settings: Omit<TWidget, 'type'> = { ...fields };

    if (color) {
      settings.color = typeof color === 'string' ? color : color?.toHexString() || '';
    }
    if (colorSecondary) {
      settings.colorSecondary = typeof colorSecondary === 'string' ? colorSecondary : colorSecondary?.toHexString() || '';
    }
    if (bubblesColor) {
      settings.bubblesColor = typeof bubblesColor === 'string' ? bubblesColor : bubblesColor?.toHexString() || '';
    }

    const searchParams = Object.entries(settings).map<string>(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value || ''))}`;
    });
    const url = template(ROUTES.WIDGETS_OPPOSITE, { slug: '' });

    setSrc(`${url}?${searchParams.join('&')}`);
  };

  useEffect(() => {
    setTimeout(handleRefresh, 200); // waiting for all possible form values fully init
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={styles.iframeContainer}>
        {src && <iframe src={src} className={styles.iframe} />}
      </div>
      <div className={styles.info}>
        <Button icon={reloadIcon} onClick={handleRefresh}>
          {t.reload}
        </Button>
        <i>
          {t.viewArea}
        </i>
      </div>
    </div>
  );
};

export default Preview;
