import Opposite from '@/app/widgets/opposite/_components/Opposite';
import Clock from '@/app/widgets/clock/_components/Clock';
import Circle from '@/app/widgets/circle/_components/Circle';
import Oscilloscope from '@/app/widgets/oscilloscope/_components/Oscilloscope';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const Goals = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  if (data.type === 'opposite') {
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
      parts,
    } = data;

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
        parts={parts}
      />
    );
  }

  if (data.type === 'clock') {
    const {
      goal,
      goalSecondary,
      image,
      leverage,
      infinite,
      half,
      timer,
      animationDuration,
      animationFunction,
    } = data;

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
    );
  }

  if (data.type === 'circle') {
    const {
      goal,
      goalSecondary,
      image,
      imageSecondary,
      leverage,
      rotate,
      half,
      timer,
    } = data;

    return (
      <Circle
        goal={goal}
        goalSecondary={goalSecondary}
        image={image}
        imageSecondary={imageSecondary}
        leverage={leverage}
        rotate={rotate}
        half={half}
        timer={timer}
      />
    );
  }

  if (data.type === 'oscilloscope') {
    const {
      goal,
      goalSecondary,
      leverage,
      color,
      colorSecondary,
      colorTertiary,
      timer,
      fade,
      variant,
    } = data;

    return (
      <Oscilloscope
        goal={goal}
        goalSecondary={goalSecondary}
        leverage={leverage}
        color={color}
        colorSecondary={colorSecondary}
        colorTertiary={colorTertiary}
        timer={timer}
        fade={fade}
        variant={variant}
      />
    );
  }

  return null;
};

export default Goals;
