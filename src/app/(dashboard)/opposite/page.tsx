import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';

import OppositeComponent from './_components/Opposite';

const Opposite = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form type="opposite">
      <OppositeComponent />
    </Form>
  );
}

export default Opposite;
