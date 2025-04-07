import Oscilloscope from './_components/Oscilloscope';
import type { TOscilloscopeVariants } from '@/types/widgets';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    leverage?: number;
    color?: string;
    colorSecondary?: string;
    colorTertiary?: string;
    delay?: number;
    fade?: boolean;
    variant?: TOscilloscopeVariants;
  }>;

}


const WidgetOscilloscope = async ({ searchParams }: Props) => {
  const {
    goal,
    goalSecondary,
    leverage,
    color,
    colorSecondary,
    colorTertiary,
    delay,
    fade,
    variant,
  } = await searchParams || {};

  if (!goal || !color) {
    return null;
  }

  return (
    <Oscilloscope
      goal={goal}
      goalSecondary={goalSecondary}
      leverage={leverage}
      color={color}
      colorSecondary={colorSecondary}
      colorTertiary={colorTertiary}
      delay={delay}
      fade={fade}
      variant={variant}
    />
  )
};

export default WidgetOscilloscope;
