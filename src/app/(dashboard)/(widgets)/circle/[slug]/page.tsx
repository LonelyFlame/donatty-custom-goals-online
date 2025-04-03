import Form from '../../../_components/Form';

import Circle from '../_components/Circle';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditCircle = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="circle">
      <Circle slug={slug} />
    </Form>
  );
}

export default EditCircle;
