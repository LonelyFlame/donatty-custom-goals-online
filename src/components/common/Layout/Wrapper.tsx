'use client'

import Link from 'next/link';
import { Layout } from 'antd';
import type { PropsWithChildren } from 'react';

import { ROUTES } from '@/constants/routes';
import translations from '@/translations';

import styles from './Layout.module.scss';

const { footer: t } = translations;

export default function Wrapper({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Layout.Content className={styles.content}>
        {children}
      </Layout.Content>
      <Layout.Footer>
        {t.createdBy} @LonelyFlame. {t.hereUsed} <Link href={ROUTES.COOKIES}>{t.cookies}</Link>.
      </Layout.Footer>
    </>
  );
};
