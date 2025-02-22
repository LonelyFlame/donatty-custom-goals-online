'use client';

import { PropsWithChildren } from 'react';
import { Layout } from 'antd';

import styles from './Sidebar.module.scss'

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <Layout.Sider className={styles.sider}>
      {children}
    </Layout.Sider>
  );
};

export default Wrapper;
