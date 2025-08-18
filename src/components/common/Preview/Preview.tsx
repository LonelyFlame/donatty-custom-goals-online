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
import { PARTS_DELIMITER } from '../../../constants/widgets';

import styles from './Preview.module.scss';

const reloadIcon = <ReloadOutlined />;

const { components: { preview: t } } = translations;

interface Props {
  type: TWidgetType;
  variant?: 'square' | 'rectangle' | 'default';
}

interface PreviewSearchParams extends Omit<TWidget, 'type' | 'parts'> {
  parts?: string;
}

const Preview = ({ type, variant = 'default' }: Props) => {
  const [src, setSrc] = useState('');

  const form = Form.useFormInstance<TWidgetFormData>();

  const handleRefresh = () => {
    const {
      color,
      colorSecondary,
      colorTertiary,
      image,
      imageSecondary,
      parts,
      ...fields
    } = form.getFieldsValue();
    const searchParams: PreviewSearchParams = { ...fields };

    if (color) {
      searchParams.color = typeof color === 'string'
        ? color
        : color?.toHexString() || '';
    }

    if (colorSecondary) {
      searchParams.colorSecondary = typeof colorSecondary === 'string'
        ? colorSecondary
        : colorSecondary?.toHexString() || '';
    }

    if (colorTertiary) {
      searchParams.colorTertiary = typeof colorTertiary === 'string'
        ? colorTertiary
        : colorTertiary?.toHexString() || '';
    }

    if (image?.length) {
      searchParams.image = image.at(0)?.url;
    }

    if (imageSecondary?.length) {
      searchParams.imageSecondary = imageSecondary.at(0)?.url;
    }

    if (parts?.length) {
      searchParams.parts = parts.join(PARTS_DELIMITER);
    }

    const searchParamsString = Object.entries(searchParams).map<string>(([key, value]) => {
      return `${key}=${encodeURIComponent(String(value || ''))}`;
    });


    const url = template(MAP_TYPE_TO_WIDGET_ROUTE[type], { slug: '' });

    setSrc(`${url}?${searchParamsString.join('&')}`);
  };

  useEffect(() => {
    setTimeout(handleRefresh, 200); // waiting for all possible form values fully init
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn({ [styles.variantSquare]: variant === 'square', [styles.variantRectangle]: variant === 'rectangle' })}>
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
