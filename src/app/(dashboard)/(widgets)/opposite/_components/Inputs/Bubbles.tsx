'use client';

import { ColorPicker, Form } from 'antd';

import FormItem from '../../../../../../components/ui/FormItem';
import translations from '../../../../../../translations';
import type { TWidgetOppositeFormData } from '../../../../../../types/forms';

const { forms: t } = translations;

const Bubbles = () => {
  const form = Form.useFormInstance<TWidgetOppositeFormData>();
  const isLiquid = Form.useWatch('liquid', form);

  if(!isLiquid) {
    return null;
  }

  return (
    <FormItem
      name="bubblesColor"
      label={t.bubbles.colorLabel}
      rules={[{ required: true, message: t.validation.required }]}
      initialValue="#808080"
    >
      <ColorPicker showText />
    </FormItem>
  );
};

export default Bubbles;
