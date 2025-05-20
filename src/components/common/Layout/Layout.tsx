import { Layout as AntdLayout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { PropsWithChildren } from 'react';

import Sidebar from '@/components/common/Sidebar';

import Wrapper from './Wrapper';

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <AntdRegistry>
      <AntdLayout hasSider>
        <Sidebar />
        <AntdLayout>
          <Wrapper>
            {children}
          </Wrapper>
        </AntdLayout>
      </AntdLayout>
    </AntdRegistry>
  );
};
