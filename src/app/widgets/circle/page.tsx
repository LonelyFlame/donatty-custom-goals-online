import Circle from './_components/Circle';

interface Props {
  searchParams?: Promise<{
    goal?: string;
    goalSecondary?: string;
    image?: string;
    imageSecondary?: string;
    leverage?: number;
    rotate?: boolean;
    half?: boolean;
    delay?: number;
  }>;
}

const WidgetCircle = async ({ searchParams }: Props) => {
  const { goal, goalSecondary, image, imageSecondary, rotate, leverage, half, delay } = await searchParams || {};

  const invalid = !goal || !image;
  if (invalid) {
    return null;
  }

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
