import Lss from '../_components/Lss';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOscilloscope = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    alert,
    leverage,
    color,
    colorSecondary,
    colorTertiary,
    timer,
    fade,
    variant,
  } = await getData(slug);

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
      slug={slug}
    />
  )
};

export default WidgetOscilloscope;
