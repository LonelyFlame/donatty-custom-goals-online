import Lss from '@/app/widgets/lss/_components/Lss';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const Alerts = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  if (data.type === 'lss') {
    const {
      alert,
      leverage,
      color,
      colorSecondary,
      colorTertiary,
      timer,
      fade,
      variant,
      sfx,
      font,
      fontSize,
    } = data;

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
        sfx={sfx}
        font={font}
        fontSize={fontSize}
      />
    );
  }

  return null;
};

export default Alerts;
