import translations from '@/translations';
import type { TOppositeVariants } from '@/types/widgets';

const { forms: { oppositeVariant: t } } = translations;

export const VARIANTS_OPTIONS: { label: string, value: TOppositeVariants }[] = [
  { label: t.options.filling, value: 'filling' },
  { label: t.options.contestation, value: 'contestation' },
];
