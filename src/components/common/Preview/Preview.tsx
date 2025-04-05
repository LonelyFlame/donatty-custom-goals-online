'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import { Form, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { template } from '@/utils/strings';
import { MAP_TYPE_TO_WIDGET_ROUTE } from '@/constants/routes';
import translations from '@/translations';
import type { TWidget, TWidgetType } from '@/types/widgets';
import type { TWidgetFormData } from '@/types/forms';

import styles from './Preview.module.scss';

const reloadIcon = <ReloadOutlined />;

const { components: { preview: t } } = translations;

interface Props {
  type: TWidgetType;
  variant?: 'square' | 'rectangle';
}

const Preview = ({ type, variant = 'rectangle' }: Props) => {
  const [src, setSrc] = useState('');

  const form = Form.useFormInstance<TWidgetFormData>();

  const handleRefresh = () => {
    const { color, colorSecondary, tertiaryColor, image, imageSecondary, ...fields } = form.getFieldsValue();
    const settings: Omit<TWidget, 'type'> = { ...fields };

    if (color) {
      settings.color = typeof color === 'string'
        ? color
        : color?.toHexString() || '';
    }

    if (colorSecondary) {
      settings.colorSecondary = typeof colorSecondary === 'string'
        ? colorSecondary
        : colorSecondary?.toHexString() || '';
    }

    if (tertiaryColor) {
      settings.tertiaryColor = typeof tertiaryColor === 'string'
        ? tertiaryColor
        : tertiaryColor?.toHexString() || '';
    }

    if (image?.length) {
      settings.image = image.at(0)?.url;
    }

    if (imageSecondary?.length) {
      settings.imageSecondary = imageSecondary.at(0)?.url;
    }

    const searchParams = Object.entries(settings).map<string>(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value || ''))}`;
    });


    const url = template(MAP_TYPE_TO_WIDGET_ROUTE[type], { slug: '' });

    setSrc(`${url}?${searchParams.join('&')}`);
  };

  useEffect(() => {
    setTimeout(handleRefresh, 200); // waiting for all possible form values fully init
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn({ [styles.variantSquare]: variant === 'square' })}>
      <div className={styles.iframeContainer}>
        {src && <iframe src={src} className={styles.iframe} />}
      </div>
      <div className={styles.info}>
        <Button icon={reloadIcon} onClick={handleRefresh}>
          {t.reload}
        </Button>
        <i>
          {t.viewArea[variant]}
        </i>
      </div>
    </div>
  );
};

export default Preview;
