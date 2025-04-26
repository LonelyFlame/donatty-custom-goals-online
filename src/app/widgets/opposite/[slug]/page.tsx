import Opposite from '../_components/Opposite';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOpposite = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    color,
    colorSecondary,
    leverage,
    liquid,
    colorTertiary,
    timer,
    animationDuration,
    animationFunction,
  } = await getData(slug);

  return (
    <Opposite
      goal={goal}
      goalSecondary={goalSecondary}
      color={color}
      colorSecondary={colorSecondary}
      leverage={leverage}
      liquid={liquid}
      colorTertiary={colorTertiary}
      timer={timer}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetOpposite;
