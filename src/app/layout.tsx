import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next'

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
