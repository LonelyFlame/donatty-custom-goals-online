import Form from '@/app/(dashboard)/_components/Form';

import Multiple from '../_components/Multiple';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditMultiple = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="multiple">
      <Multiple slug={slug} />
    </Form>
  );
}

export default EditMultiple;
