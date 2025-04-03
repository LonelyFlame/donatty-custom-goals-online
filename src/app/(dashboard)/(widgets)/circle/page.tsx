import { unauthorized } from 'next/navigation';

import { auth } from '../../../../auth';

import Form from '../../_components/Form';

import Circle from './_components/Circle';

const CreateCircle = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form type="circle">
      <Circle />
    </Form>
  );
}

export default CreateCircle;
