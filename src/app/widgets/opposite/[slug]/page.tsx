import { LIQUID_DEFAULT_ANIMATION_DURATION, LIQUID_DEFAULT_ANIMATION_FUNCTION } from '@/constants/widgets';

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
    delay,
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
      delay={delay}
      animationDuration={!animationDuration && liquid ? LIQUID_DEFAULT_ANIMATION_DURATION : animationDuration}
      animationFunction={!animationFunction && liquid ? LIQUID_DEFAULT_ANIMATION_FUNCTION : animationFunction}
    />
  )
};

export default WidgetOpposite;
