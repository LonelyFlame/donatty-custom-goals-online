import '@ant-design/v5-patch-for-react-19';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next'

import '@/theme/globals.css';

export const metadata: Metadata = {
  title: 'Custom Donatty goals',
  description: 'Customize your Donatty goal view',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
};
