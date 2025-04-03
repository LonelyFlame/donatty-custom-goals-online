import Circle from '../_components/Circle';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetCircle = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    goal,
    goalSecondary,
    image,
    imageSecondary,
    leverage,
    rotate,
    half,
    delay,
  } = await getData(slug);

  return (
    <Circle
      goal={goal}
      goalSecondary={goalSecondary}
      image={image}
      imageSecondary={imageSecondary}
      leverage={leverage}
      rotate={rotate}
      half={half}
      delay={delay}
    />
  )
};

export default WidgetCircle;
