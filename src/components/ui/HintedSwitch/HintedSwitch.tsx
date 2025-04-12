import { Switch } from 'antd';
import type { ReactNode } from 'react';

import Hint from '@/components/ui/Hint';
import FormItem from '@/components/ui/FormItem';

import styles from './HintedSwitch.module.scss';

interface Props {
  name: string;
  label: ReactNode;
  hint: ReactNode;
  disabled?: boolean;
}

const HintedSwitch = ({ label, name, hint, disabled }: Props) => {
  return (
    <FormItem label={label} className={styles.container}>
      <FormItem name={name}>
        <Switch disabled={disabled} />
      </FormItem>
      <Hint>
        {hint}
      </Hint>
    </FormItem>
  );
};

export default HintedSwitch;
