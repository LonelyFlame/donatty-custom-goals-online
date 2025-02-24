'use client'

import Link from 'next/link';
import { Layout } from 'antd';
import type { PropsWithChildren } from 'react';

import styles from './Layout.module.scss';

export default function Wrapper({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Layout.Content className={styles.content}>
        {children}
      </Layout.Content>
      <Layout.Footer>
        Created by <Link target="_blank" href="https://t.me/lonelyflame">@LonelyFlame</Link>
      </Layout.Footer>
    </>
  );
};
