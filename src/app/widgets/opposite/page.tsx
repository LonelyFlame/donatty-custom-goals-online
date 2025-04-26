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
    timer?: number;
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
    timer,
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
      timer={timer}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetOpposite;
