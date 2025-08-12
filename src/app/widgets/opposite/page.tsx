import type { TOppositeVariants } from '@/types/widgets';

import Opposite from './_components/Opposite';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    color?: string;
    colorSecondary?: string;
    image?: string;
    imageSecondary?: string;
    leverage?: number;
    liquid?: boolean;
    colorTertiary?: string;
    timer?: number;
    animationDuration?: number;
    animationFunction?: string;
    variant?: TOppositeVariants;
  }>;

}


const WidgetOpposite = async ({ searchParams }: Props) => {
  const {
    goal,
    goalSecondary,
    color,
    colorSecondary,
    image,
    imageSecondary,
    leverage,
    liquid,
    colorTertiary,
    timer,
    animationDuration,
    animationFunction,
    variant,
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
      image={image}
      imageSecondary={imageSecondary}
      leverage={leverage}
      liquid={liquid}
      colorTertiary={colorTertiary}
      timer={timer}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
      variant={variant}
    />
  )
};

export default WidgetOpposite;
