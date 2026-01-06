import Multiple from './_components/Multiple';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    color?: string;
    image?: string;
    leverage?: number;
    timer?: number;
    animationDuration?: number;
    animationFunction?: string;
  }>;

}


const WidgetMultiple = async ({ searchParams }: Props) => {
  const {
    goal,
    goalSecondary = '',
    color,
    image,
    leverage,
    timer,
    animationDuration,
    animationFunction,
  } = await searchParams || {};

  if (!leverage || !goal || !color) {
    return null;
  }

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
