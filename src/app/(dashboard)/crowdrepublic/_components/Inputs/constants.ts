import translations from '@/translations';
import type { TCrowdRepublicVariants } from '@/types/widgets';

const { forms: { crGoal: t } } = translations;

export const VARIANTS_OPTIONS: { label: string, value: TCrowdRepublicVariants }[] = [
  { label: t.nearest, value: 'nearest' },
  { label: t.main, value: 'main' },
  { label: t.full, value: 'full' },
];
