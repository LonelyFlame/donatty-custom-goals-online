import BoostyCount from '../_components/BoostyCount';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetCR = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    leverage,
    parts,
    color,
    colorSecondary,
    text,
    font,
    fontSize,
    animationDuration,
    animationFunction,
  } = await getData(slug);

  return (
    <BoostyCount
      slug={slug}
      leverage={leverage}
      parts={parts}
      color={color}
      colorSecondary={colorSecondary}
      text={text}
      font={font}
      fontSize={fontSize}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetCR;
