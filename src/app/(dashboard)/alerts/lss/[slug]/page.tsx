import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';

import Lss from '../_components/Lss';
import { getData } from './utils';

interface Props {
  params: Promise<{ slug: string }>;
}

const EditLss = async ({ params }: Props) => {
  const { slug } = await params;

  const data = await getData(slug);

  return (
    <>
      <Form data={data} slug={slug} type="lss">
        <Lss slug={slug} />
      </Form>
      <FontsLoader />
    </>
  );
}

export default EditLss;
