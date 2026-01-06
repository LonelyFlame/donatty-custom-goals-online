import Multiple from '../_components/Multiple';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetMultiple = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    color,
    image,
    leverage,
    timer,
    animationDuration,
    animationFunction,
    colorSecondary,
    text,
    font,
    fontSize
  } = await getData(slug);

  return (
    <Multiple
      goal={goal}
      goalSecondary={goalSecondary}
      color={color}
      image={image}
      leverage={leverage}
      timer={timer}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
      colorSecondary={colorSecondary}
      text={text}
      font={font}
      fontSize={fontSize}
    />
  )
};

export default WidgetMultiple;
