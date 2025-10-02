import Dying from '../_components/Dying';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOscilloscope = async ({ params }: Props) => {
  const { slug } = await params;

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
  } = await getData(slug);

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
      slug={slug}
      sfx={sfx}
      font={font}
      fontSize={fontSize}
    />
  )
};

export default WidgetOscilloscope;
