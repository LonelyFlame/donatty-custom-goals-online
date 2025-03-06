import { auth } from '@/auth';

import Table from './_components/Table';
import { getData } from './utils';
import styles from './page.module.scss';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          Ну что-то тут написать надо приветственное
        </main>
      </div>
    );
  }

  const data = await getData(session.user.email);

  return (
    <Table data={data} />
  );
}
