import { Row, Col } from 'antd';

import { auth } from '@/auth';

import Table from './_components/Table';
import { getUser, getGoals, getAlerts } from './utils';
import styles from './page.module.scss';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          Ну что-то тут написать надо приветственное.
          <br />
          Короче, тут можно делать виджеты сборов чуть более прикольные, чем позволяет это сделать Донатти.
        </main>
      </div>
    );
  }

  const user = await getUser(session.user.email);
  const goals = await getGoals(user);
  const alerts = await getAlerts(user);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Table data={goals} />
      </Col>
      <Col span={12}>
        <Table data={alerts} />
      </Col>
    </Row>
  );
}
