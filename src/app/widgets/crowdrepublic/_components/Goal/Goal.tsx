'use client';

import { useMemo } from 'react';

import { useProjectSync } from '@/libs/crowdrepublic/hooks';

import translations from '@/translations/widgets';

import { getLabel } from './utils';
import styles from './Goal.module.scss';

interface Props {
  id: number;
  initialValue: number;
  max: number;
  goal: number;
  goals: {
    id: number;
    name: string;
    value: number;
  }[];
  labelTemplate?: string;
}

const defaultLabel = translations.cr.defaultLabel;

const Goal = ({
  id,
  initialValue,
  max,
  goal,
  goals,
  labelTemplate = defaultLabel,
}: Props) => {
  const value = useProjectSync(id, initialValue);

  const percent = useMemo<number>(() => {
    return (value / max) * 100;
  }, [value, max]);

  const label = useMemo<string>(() => {
    if (!labelTemplate) {
      return '';
    }

    return getLabel(labelTemplate, value, goal, goals);
  }, [labelTemplate, goal, goals, value]);

  return (
    <>
      <div className={styles.value}>
        {label}
      </div>
      <div
        className={styles.funded}
        style={{ width: `${percent}%` }}
      />
    </>
  );
};

export default Goal;
