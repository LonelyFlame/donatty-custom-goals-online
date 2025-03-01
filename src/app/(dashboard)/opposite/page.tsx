import { unauthorized } from 'next/navigation';

import { auth } from '../../../auth';

import OppositeComponent from './_components/Opposite';
import Form from './_components/Form';

const Opposite = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form>
      <OppositeComponent />
    </Form>
  );
}

export default Opposite;
