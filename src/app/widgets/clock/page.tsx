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
  }>;

}


const WidgetClock = async ({ searchParams }: Props) => {
  const { goal, goalSecondary, image, infinite, leverage, half, delay } = await searchParams || {};

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
    />
  )
};

export default WidgetClock;
