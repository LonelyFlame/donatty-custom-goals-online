import { InputNumber } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations'

import Popover from './Popover';
import styles from './Leverage.module.scss';

interface Props {
  name?: string;
}

const { components: { leverage: t } } = translations;

const addon = <Popover />;

const Leverage = ({ name = 'leverage' }: Props) => {
  return (
    <FormItem name={name} label={t.label}>
      <InputNumber
        className={styles.leverage}
        placeholder={t.placeholder}
        addonAfter={addon}
      />
    </FormItem>
  );
};

export default Leverage;
