import { InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';

import Popover from './Popover';

const { components: { delay: t } } = translations;

const addon = <Popover />

const Delay = () => {
  return (
    <FormItem name="timer" label={t.label}>
      <InputNumber placeholder={t.placeholder} addonAfter={addon}/>
    </FormItem>
  );
};

export default Delay;
