import Opposite from './_components/Opposite';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    color?: string;
    colorSecondary?: string;
    leverage?: number;
    liquid?: boolean;
    bubblesColor?: string;
  }>;

}


const WidgetOpposite = async ({ searchParams }: Props) => {
  const { goal, goalSecondary, color, colorSecondary, leverage, liquid, bubblesColor } = await searchParams || {};

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
      bubblesColor={bubblesColor}
    />
  )
};

export default WidgetOpposite;
