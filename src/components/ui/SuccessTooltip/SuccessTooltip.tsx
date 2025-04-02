'use client';

import { PropsWithChildren } from 'react';
import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

import styles from './SuccessTooltip.module.scss';

interface Props extends PropsWithChildren {
  title: string;
  open?: boolean;
}

const checkIcon = <CheckCircleFilled className={styles.successIcon} />;

const SuccessTooltip = ({ title, open = false, children }: Props) => {
  return (
    <Tooltip
      title={
        <div className={styles.success}>
          {checkIcon}
          {title}
        </div>
      }
      placement="right"
      arrow={false}
      open={open}
      rootClassName={styles.tooltip}
    >
      {children}
    </Tooltip>
  );
};

export default SuccessTooltip;
