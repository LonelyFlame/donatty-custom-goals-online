'use client'

import { Layout } from 'antd';
import type { PropsWithChildren } from 'react';

export default function Wrapper({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Layout.Content>
        {children}
      </Layout.Content>
      <Layout.Footer>
        {new Date().getFullYear()} Created by LonelyFlame
      </Layout.Footer>
    </>
  );
};
