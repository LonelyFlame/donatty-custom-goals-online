import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';
import type { TWidgetOscilloscope } from '@/types/widgets';

import Oscilloscope from './_components/Oscilloscope';

const defaultData: TWidgetOscilloscope = {
  type: 'oscilloscope',
  color: '#ff0000',
  colorSecondary: '#ffff00',
  colorTertiary: '#00ff00',
  goal: '',
  name: '',
  variant: 'sin'
}

const CreateOscilloscope = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form data={defaultData} type="oscilloscope">
      <Oscilloscope />
    </Form>
  );
}

export default CreateOscilloscope;
