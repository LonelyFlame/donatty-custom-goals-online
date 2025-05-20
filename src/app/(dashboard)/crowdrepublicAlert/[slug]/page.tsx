import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';

import CrAlert from '../_components/CrAlert';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditCrAlert = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <>
      <Form data={data} slug={slug} type="crAlert">
        <CrAlert slug={slug} />
      </Form>
      <FontsLoader />
    </>
  );
}

export default EditCrAlert;
