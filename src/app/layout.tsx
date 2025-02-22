import type { PropsWithChildren } from 'react';

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
        {children}
      </body>
    </html>
  );
};
