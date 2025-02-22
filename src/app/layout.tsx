import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { PropsWithChildren } from 'react';

import Sidebar from '@/components/common/Sidebar';
import { Wrapper } from '@/components/common/Layout';

import './globals.css';

export const metadata = {
  title: 'Custom Donatty goals',
  description: 'Customize your Donatty goal view',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <AntdRegistry>
          <Layout hasSider>
            <Sidebar />
            <Layout>
              <Wrapper>
                {children}
              </Wrapper>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};
