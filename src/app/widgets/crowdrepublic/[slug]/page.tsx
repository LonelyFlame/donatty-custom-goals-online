import CR from '../_components/CR';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetCR = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    project,
    color,
    colorSecondary,
    colorTertiary,
    text,
    font,
    fontSize,
    animationDuration,
    animationFunction,
  } = await getData(slug);

  return (
    <CR
      project={project}
      color={color}
      colorSecondary={colorSecondary}
      colorTertiary={colorTertiary}
      text={text}
      font={font}
      fontSize={fontSize}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetCR;
