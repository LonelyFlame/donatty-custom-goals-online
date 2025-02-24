'use client';

import { Input } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';

interface Props {
  name?: string;
}

const { forms: { goal: t } } = translations;

const Goal = ({ name = 'goal' }: Props) =>  {
  return (
    <FormItem name={name} label={t.label}>
      <Input.Password placeholder={t.placeholder} />
    </FormItem>
  );
};

export default Goal;
