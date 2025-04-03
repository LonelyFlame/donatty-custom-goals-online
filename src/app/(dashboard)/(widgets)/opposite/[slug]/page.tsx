import Form from '../../../_components/Form';

import Opposite from '../_components/Opposite';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditOpposite = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <Form data={data} slug={slug} type="opposite">
      <Opposite slug={slug} />
    </Form>
  );
}

export default EditOpposite;
