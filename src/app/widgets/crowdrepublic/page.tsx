import CR from './_components/CR';

interface Props {
  searchParams?: Promise<{
    project?: string;
    color?: string;
    colorSecondary?: string;
    colorTertiary?: string;
    text?: string;
    font?: string;
    fontSize?: number;
    animationDuration?: number;
    animationFunction?: string;
  }>;

}


const WidgetCR = async ({ searchParams }: Props) => {
  const {
    project,
    color,
    colorSecondary,
    colorTertiary,
    text,
    font,
    fontSize,
    animationDuration,
    animationFunction,
  } = await searchParams || {};

  if (!project || !color || !colorSecondary || !colorTertiary) {
    return null;
  }

  return (
    <CR
      project={project}
      color={color}
      colorSecondary={colorSecondary}
      colorTertiary={colorTertiary}
      text={text}
      font={font}
      fontSize={fontSize}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
    />
  )
};

export default WidgetCR;
