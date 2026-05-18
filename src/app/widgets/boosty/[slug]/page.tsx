import BoostyCount from '@/app/widgets/boostyCount/_components/BoostyCount';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const Goals = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  if (data.type === 'boosty_count') {
    const {
      leverage,
      color,
      colorSecondary,
      font,
      fontSize,
      text,
      parts,
      animationFunction,
      animationDuration,
    } = data;

    return (
      <BoostyCount
        slug={slug}
        leverage={leverage}
        color={color}
        colorSecondary={colorSecondary}
        font={font}
        fontSize={fontSize}
        text={text}
        parts={parts}
        animationFunction={animationFunction}
        animationDuration={animationDuration}
      />
    );
  }

  return null;
};

export default Goals;
