import Form from '@/app/(dashboard)/_components/Form';

import OppositeComponent from '../_components/Opposite';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const Opposite = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="opposite">
      <OppositeComponent slug={slug} />
    </Form>
  );
}

export default Opposite;
