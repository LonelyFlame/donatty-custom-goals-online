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
    delay?: number;
  }>;

}


const WidgetOpposite = async ({ searchParams }: Props) => {
  const { goal, goalSecondary, color, colorSecondary, leverage, liquid, bubblesColor, delay } = await searchParams || {};

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
      delay={delay}
    />
  )
};

export default WidgetOpposite;
