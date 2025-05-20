import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';
import translations from '@/translations/widgets';
import type { TWidgetCRAlert } from '@/types/widgets';

import CrAlert from './_components/CrAlert';

const defaultData: TWidgetCRAlert = {
  type: 'crAlert',
  color: '#000000',
  delay: 10,
  text: translations.crAlert.defaultLabel,
  project: '',
  name: '',
}

const CreateCrAlert = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <>
      <Form data={defaultData} type="crAlert">
        <CrAlert />
      </Form>
      <FontsLoader />
    </>
  );
}

export default CreateCrAlert;
