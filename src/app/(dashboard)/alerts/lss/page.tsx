import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import type { TWidgetLSS } from '@/types/widgets';
import { FontsLoader } from '@/components/common/Fonts';

import Lss from './_components/Lss';

const defaultData: TWidgetLSS = {
  type: 'lss',
  color: '#ff0000',
  colorSecondary: '#ffff00',
  colorTertiary: '#00ff00',
  variant: 'sin',
  // @ts-expect-error Should be undefined by default
  leverage: undefined,
  // @ts-expect-error Should be undefined by default
  timer: undefined,
  alert: '',
  name: '',
}

const CreateLss = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <>
      <Form data={defaultData} type="lss">
        <Lss />
      </Form>
      <FontsLoader />
    </>
  );
}

export default CreateLss;
