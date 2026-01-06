import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import type { TWidgetMultiple } from '@/types/widgets';

import Multiple from './_components/Multiple';

const defaultData: TWidgetMultiple = {
  type: 'multiple',
  color: '',
  goal: '',
  goalSecondary: '',
  image: '',
  name: '',
  leverage: 10_000,
};

const CreateMultiple = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form data={defaultData} type="multiple">
      <Multiple />
    </Form>
  );
}

export default CreateMultiple;
