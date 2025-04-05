import { unauthorized } from 'next/navigation';

import { auth } from '@/auth';

import Form from '@/app/(dashboard)/_components/Form';

import Opposite from './_components/Opposite';

const CreateOpposite = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    unauthorized();
  }

  return (
    <Form type="opposite">
      <Opposite />
    </Form>
  );
}

export default CreateOpposite;
