import translations from '../../../../../translations';
import type { TOscilloscopeVariants } from '../../../../../types/widgets';

const { forms: { plot: t } } = translations;

export const VARIANTS_OPTIONS: { label: string, value: TOscilloscopeVariants }[] = [
  { label: t.sin, value: 'sin' },
  { label: t.heart, value: 'heart' }
];
