import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import { DEFAULT_CLOCK_IMAGE_URL } from '@/constants/widgets';
import type { TGoal } from '@/types/widgets';

import Clock from './_components/Clock';

const defaultData: TGoal = {
  type: 'clock',
  name: '',
  goal: '',
  image: DEFAULT_CLOCK_IMAGE_URL,
};

const CreateClock = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form data={defaultData} type="clock">
      <Clock />
    </Form>
  );
}

export default CreateClock;
