import CRAlert from '../_components/CRAlert';

import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const WidgetOscilloscope = async ({ params }: Props) => {
  const { slug } = await params;

  const {
    project,
    delay,
    text,
    font,
    fontSize,
    color,
  } = await getData(slug);

  return (
    <CRAlert
      project={project}
      delay={delay}
      text={text}
      font={font}
      fontSize={fontSize}
      color={color}
    />
  )
};

export default WidgetOscilloscope;
