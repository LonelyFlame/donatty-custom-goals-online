import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';

import Dying from '../_components/Dying';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditDying = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <>
      <Form data={data} slug={slug} type="dying">
        <Dying slug={slug} />
      </Form>
      <FontsLoader />
    </>
  );
}

export default EditDying;
