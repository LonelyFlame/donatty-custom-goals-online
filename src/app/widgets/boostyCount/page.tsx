import BoostyCount from './_components/BoostyCount';

interface Props {
  searchParams?: Promise<{
    leverage?: number;
    parts?: number[];
    color?: string;
    colorSecondary?: string;
    text?: string;
    font?: string;
    fontSize?: number;
    animationDuration?: number;
    animationFunction?: string;
  }>;
}

const WidgetBoostyCount = async ({ searchParams }: Props) => {
  const {
    leverage,
    parts,
    color,
    colorSecondary,
    text,
    font,
    fontSize,
    animationDuration,
    animationFunction,
  } = await searchParams || {};

  if (!leverage || !color || !colorSecondary || !parts?.length) {
    return null;
  }

  return (
    <BoostyCount
      leverage={leverage}
      parts={parts}
      color={color}
      colorSecondary={colorSecondary}
      text={text}
      font={font}
      fontSize={fontSize}
      animationDuration={animationDuration}
      animationFunction={animationFunction}
      initialValue={leverage * 0.5}
    />
  )
};

export default WidgetBoostyCount;
