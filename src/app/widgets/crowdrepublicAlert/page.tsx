import CRAlert from './_components/CRAlert';

interface Props {
  searchParams?: Promise<{
    project?: string;
    color?: string;
    delay?: number;
    text?: string;
    font?: string;
    fontSize?: number;
  }>;
}

const WidgetCRAlert = async ({ searchParams }: Props) => {
  const {
    project,
    delay,
    text,
    font,
    fontSize,
    color,
  } = await searchParams || {};

  if (!project || !text) {
    return null;
  }

  return (
    <CRAlert
      project={project}
      delay={delay || 0}
      text={text}
      font={font}
      fontSize={fontSize}
      color={color}
      isPreview
    />
  )
};

export default WidgetCRAlert;
