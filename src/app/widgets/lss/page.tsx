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
      variant={variant}
    />
  )
};

export default WidgetOscilloscope;
