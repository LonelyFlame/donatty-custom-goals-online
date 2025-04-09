import Clock from './_components/Clock';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    image?: string;
    leverage?: number;
    infinite?: boolean;
    half?: boolean;
    timer?: number;
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
    timer,
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
      timer={timer}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetClock;
