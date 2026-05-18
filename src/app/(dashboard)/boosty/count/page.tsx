import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import { FontsLoader } from '@/components/common/Fonts';
import translations from '@/translations/widgets';
import type { TWidgetBoostyCount } from '@/types/widgets';

import Count from './_components/Count';

const defaultData: TWidgetBoostyCount = {
  type: 'boosty_count',
  color: '#808080',
  colorSecondary: '#008000',
  leverage: 0,
  parts: [],
  text: translations.boostyCount.defaultLabel,
  secret: '',
  name: ''
}

const CreateBoostyCount = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <>
      <Form data={defaultData} type="boosty_count">
        <Count />
      </Form>

      <FontsLoader />
    </>
  );
}

export default CreateBoostyCount;
