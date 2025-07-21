'use server';

import Container from './_components/Container';

interface Props {
  searchParams?: Promise<{
    host?: string;
    session?: string;
  }>;
}


const WidgetClock = async ({ searchParams }: Props) => {
  const {
    host,
    session,
  } = await searchParams || {};

  const invalid = !host || !session;
  if (invalid) {
    return null;
  }

  return <Container host={host} session={session} delay={5} />;
};

export default WidgetClock;
