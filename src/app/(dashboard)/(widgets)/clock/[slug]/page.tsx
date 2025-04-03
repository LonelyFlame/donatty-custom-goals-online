import Form from '../../../_components/Form';

import Clock from '../_components/Clock';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditClock = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="clock">
      <Clock slug={slug} />
    </Form>
  );
}

export default EditClock;
