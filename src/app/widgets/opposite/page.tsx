import { LIQUID_DEFAULT_ANIMATION_DURATION, LIQUID_DEFAULT_ANIMATION_FUNCTION } from '@/constants/widgets';

import Opposite from './_components/Opposite';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    color?: string;
    colorSecondary?: string;
    leverage?: number;
    liquid?: boolean;
    colorTertiary?: string;
    delay?: number;
    animationDuration?: number;
    animationFunction?: string;
  }>;

}


const WidgetOpposite = async ({ searchParams }: Props) => {
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
  } = await searchParams || {};

  const missingPrimary = !goal || !color;
  const missingSecondary = goalSecondary && !colorSecondary;
  if (missingPrimary || missingSecondary) {
    return null;
  }

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
