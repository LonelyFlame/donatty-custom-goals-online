import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next'

import Layout from '@/components/common/Layout';

export const metadata: Metadata = {
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
