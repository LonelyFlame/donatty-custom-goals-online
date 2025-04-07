'use client';

import { useMemo } from 'react';
import { Form } from 'antd';
import type { ColorPickerProps } from 'antd';
import type { TWidgetOscilloscopeFormData } from '@/types/forms';

import { getColorScale } from '@/utils/colors';

import styles from './ColorsPreview.module.scss';

interface Props {
  domain?: number[];
}

const ColorsPreview = ({ domain }: Props) => {
  const form = Form.useFormInstance<TWidgetOscilloscopeFormData>();
  const color: ColorPickerProps['value'] = Form.useWatch('color', form);
  const colorSecondary = Form.useWatch('colorSecondary', form);
  const colorTertiary = Form.useWatch('colorTertiary', form);

  const colorScale = useMemo<string[]>(() => {
    const colorScale = getColorScale([color, colorSecondary, colorTertiary], { notTransparent: true });

    if (domain) {
      colorScale.domain(domain);
    }

    return Array.from({ length: 101 }, (_, index) => colorScale(index / 100).toString());
  }, [color, colorSecondary, colorTertiary, domain]);

  return (
    <div className={styles.container}>
      {colorScale.map(((colorItem, index) => (
        <div key={index} style={{ backgroundColor: colorItem }} />
      )))}
    </div>
  );
};

export default ColorsPreview;
