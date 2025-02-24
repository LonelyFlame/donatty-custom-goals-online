import OppositeComponent from '../_components/Opposite';
import Form from '../_components/Form';

import { getGoal } from './mock';

interface Props {
  params: Promise<{ slug: string }>;
}

const Opposite = async ({ params }: Props) => {
  const slug = (await params).slug;
  const data = getGoal(slug);

  return (
    <Form data={data}>
      <OppositeComponent />
    </Form>
  );
}

export default Opposite;
