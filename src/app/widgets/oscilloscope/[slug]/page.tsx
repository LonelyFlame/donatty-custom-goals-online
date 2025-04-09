import Oscilloscope from '../_components/Oscilloscope';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOscilloscope = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    leverage,
    color,
    colorSecondary,
    colorTertiary,
    timer,
    fade,
    variant,
  } = await getData(slug);

  return (
    <Oscilloscope
      goal={goal}
      goalSecondary={goalSecondary}
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
