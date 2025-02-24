import type { PropsWithChildren } from 'react';

import Layout from '@/components/common/Layout';

import './globals.css';

export const metadata = {
  title: 'Custom Donatty goals',
  description: 'Customize your Donatty goal view',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <Layout>
      {children}
    </Layout>
  );
};
