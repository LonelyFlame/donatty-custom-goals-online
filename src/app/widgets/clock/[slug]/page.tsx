import Clock from '../_components/Clock';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetClock = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    image,
    leverage,
    infinite,
    half,
    delay,
    animationDuration,
    animationFunction,
  } = await getData(slug);

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
