'use client';

import maxBy from 'lodash/maxBy';
import { useMemo } from 'react';

import { useProjectSync } from '@/libs/crowdrepublic/hooks';

import translations from '@/translations/widgets';
import type { TCrowdRepublicVariants } from '@/types/widgets';

import { getLabel, getNextGoal } from './utils';
import Item from './Item';
import styles from './Goal.module.scss';
import type { TGoal } from './utils';

interface Props {
  id: number;
  initialValue: number;
  goal: number;
  goals: {
    id: number;
    name: string;
    value: number;
  }[];
  labelTemplate?: string;
  variant: TCrowdRepublicVariants;
}

const defaultLabel = translations.cr.defaultLabel;

const Goal = ({
  id,
  initialValue,
  goal,
  goals,
  labelTemplate = defaultLabel,
  variant,
}: Props) => {
  const value = useProjectSync(id, initialValue);

  const { items, max } = useMemo<{ items: TGoal[]; max: number }>(() => {
    const mainGoal: TGoal = { value: goal, name: '', id: 0 };

    if (variant === 'main') {
      return { items: [mainGoal], max: goal };
    }

    const allGoals = [mainGoal, ...goals];

    if (variant === 'full') {
      const maxGoal = maxBy(allGoals, 'value')!;
      return { items: allGoals.slice(0, -1), max: maxGoal.value };
    }

    const completedGoals = allGoals.filter(goal => goal.value < value);
    const nextGoal = getNextGoal(goal, goals, value);

    return { items: completedGoals, max: nextGoal.value };
  }, [goal, goals, value, variant]);

  const percent = useMemo<number>(() => {
    return Math.min((value / max) * 100, 100);
  }, [max, value]);

  const label = useMemo<string>(() => {
    if (!labelTemplate) {
      return '';
    }

    return getLabel(labelTemplate, value, goal, goals, max);
  }, [labelTemplate, goal, goals, value, max]);

  return (
    <>
      <div className={styles.value}>
        {label}
      </div>
      <div
        className={styles.funded}
        style={{ width: `${percent}%` }}
      />
      {items.map(({ id, value }) => (
        <Item key={id} value={value} max={max} />
      ))}
    </>
  );
};

export default Goal;
