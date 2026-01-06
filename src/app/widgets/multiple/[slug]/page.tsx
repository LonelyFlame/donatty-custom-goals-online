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
    />
  )
};

export default WidgetMultiple;
