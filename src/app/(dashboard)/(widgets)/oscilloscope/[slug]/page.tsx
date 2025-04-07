import Form from '@/app/(dashboard)/_components/Form';

import Oscilloscope from '../_components/Oscilloscope';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditOscilloscope = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="oscilloscope">
      <Oscilloscope slug={slug} />
    </Form>
  );
}

export default EditOscilloscope;
