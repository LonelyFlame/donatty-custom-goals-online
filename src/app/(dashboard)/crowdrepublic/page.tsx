import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';
import translations from '@/translations/widgets';
import type { TWidgetCR } from '@/types/widgets';

import Cr from './_components/Cr';

const defaultData: TWidgetCR = {
  type: 'cr',
  color: '#808080',
  colorSecondary: '#008000',
  colorTertiary: '#000000',
  text: translations.cr.defaultLabel,
  project: '',
  name: '',
}

const CreateCr = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <>
      <Form data={defaultData} type="cr">
        <Cr />
      </Form>
      <FontsLoader />
    </>
  );
}

export default CreateCr;
