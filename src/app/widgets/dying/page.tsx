import Dying from './_components/Dying';
import type { TOscilloscopeVariants } from '@/types/widgets';

interface Props {
  searchParams?: Promise<{
    alert?: string;
    leverage?: number;
    leverageSecondary?: number;
    color?: string;
    colorSecondary?: string;
    colorTertiary?: string;
    timer?: number;
    fade?: boolean;
    goals?: string[];
    variant?: TOscilloscopeVariants;
    sfx?: boolean;
    font?: string;
    fontSize?: number;
  }>;
}

const WidgetOscilloscope = async ({ searchParams }: Props) => {
  const {
    alert,
    leverage,
    leverageSecondary,
    color,
    colorSecondary,
    colorTertiary,
    timer,
    fade,
    goals,
    variant,
    sfx,
    font,
    fontSize,
  } = await searchParams || {};

  if (!alert || !leverage || !leverageSecondary || !timer || !color || !colorSecondary) {
    return null;
  }

  return (
    <Dying
      alert={alert}
      leverage={leverage}
      leverageSecondary={leverageSecondary}
      color={color}
      colorSecondary={colorSecondary}
      colorTertiary={colorTertiary}
      timer={timer}
      fade={fade}
      goals={goals}
      variant={variant}
      sfx={sfx}
      font={font}
      fontSize={fontSize}
    />
  )
};

export default WidgetOscilloscope;
