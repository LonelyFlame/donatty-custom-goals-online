import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';

import Cr from '../_components/Cr';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditCr = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <>
      <Form data={data} slug={slug} type="cr">
        <Cr slug={slug} />
      </Form>
      <FontsLoader />
    </>
  );
}

export default EditCr;
