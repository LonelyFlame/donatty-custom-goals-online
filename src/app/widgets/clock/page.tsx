import Clock from './_components/Clock';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    image?: string;
    leverage?: number;
    infinite?: boolean;
    half?: boolean;
    delay?: number;
    animationDuration?: number;
    animationFunction?: string;
  }>;

}


const WidgetClock = async ({ searchParams }: Props) => {
  const {
    goal,
    goalSecondary,
    image,
    infinite,
    leverage,
    half,
    delay,
    animationDuration,
    animationFunction,
  } = await searchParams || {};

  const invalid = !goal || !image;
  if (invalid) {
    return null;
  }

  return (
    <Clock
      goal={goal}
      goalSecondary={goalSecondary}
      image={image}
      leverage={leverage}
      infinite={infinite}
      half={half}
      delay={delay}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetClock;
