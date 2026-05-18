'use client';

import { useMemo } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { useSubscribersCount } from '@/libs/boosty/hooks';

import translations from '@/translations/widgets';
import { template } from '@/utils/strings';

import styles from './Goal.module.scss';

interface Props {
  leverage: number;
  levelIds: number[];
  slug?: string;
  labelTemplate?: string;
  initialValue?: number;
}

const defaultLabel = translations.boostyCount.defaultLabel;

const Goal = ({
  slug,
  leverage,
  levelIds,
  labelTemplate = defaultLabel,
  initialValue,
}: Props) => {
  const value = useSubscribersCount(slug || '', initialValue || 0, levelIds);

  const percent = useMemo<number>(() => {
    return Math.min((value / leverage) * 100, 100);
  }, [leverage, value]);

  const label = useMemo<string>(() => {
    if (!labelTemplate) {
      return '';
    }

    return template(labelTemplate, { count: value });
  }, [labelTemplate, value]);

  return (
    <>
      <div className={styles.value}>
        {!value && <LoadingOutlined className="loader" />}
        {!!value && label}
      </div>

      <div
        className={styles.funded}
        style={{ width: `${percent}%` }}
      />
    </>
  );
};

export default Goal;
