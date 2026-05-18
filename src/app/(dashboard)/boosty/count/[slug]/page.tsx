import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';

import Count from '../_components/Count';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditBoostyCount = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <>
      <Form data={data} slug={slug} type="boosty_count">
        <Count slug={slug} />
      </Form>

      <FontsLoader />
    </>
  );
}

export default EditBoostyCount;
