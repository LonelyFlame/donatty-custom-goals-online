import type { PropsWithChildren } from 'react';

import '@/theme/widgets.css';

export const metadata = {
  title: 'Custom Donatty goals',
  description: 'Customize your Donatty goal view',
};

export default function WidgetsLayout({
  children,
}: PropsWithChildren) {
  return children;
};
