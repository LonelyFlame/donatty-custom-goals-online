import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import type { TWidgetOpposite } from '@/types/widgets';

import Opposite from './_components/Opposite';

const defaultData: TWidgetOpposite = {
  type: 'opposite',
  variant: 'filling',
  color: '',
  goal: '',
  image: '',
  name: '',
};

const CreateOpposite = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form data={defaultData} type="opposite">
      <Opposite />
    </Form>
  );
}

export default CreateOpposite;
