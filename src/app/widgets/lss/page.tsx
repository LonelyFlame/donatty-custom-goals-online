import Lss from './_components/Lss';
import type { TOscilloscopeVariants } from '@/types/widgets';

interface Props {
  searchParams?: Promise<{
    alert?: string;
    leverage?: number;
    color?: string;
    colorSecondary?: string;
    colorTertiary?: string;
    timer?: number;
    fade?: boolean;
    goals?: string[];
    variant?: TOscilloscopeVariants;
  }>;

}


const WidgetOscilloscope = async ({ searchParams }: Props) => {
  const {
    alert,
    leverage,
    color,
    colorSecondary,
    colorTertiary,
    timer,
    fade,
    goals,
    variant,
  } = await searchParams || {};

  if (!alert || !leverage || !timer || !color || !colorSecondary) {
    return null;
  }

  return (
    <Lss
      alert={alert}
      leverage={leverage}
      color={color}
      colorSecondary={colorSecondary}
      colorTertiary={colorTertiary}
      timer={timer}
      fade={fade}
      goals={goals}
      variant={variant}
    />
  )
};

export default WidgetOscilloscope;
