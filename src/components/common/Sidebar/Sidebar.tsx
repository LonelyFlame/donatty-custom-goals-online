import { Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { auth } from '@/auth';

import { getItems } from './utils';
import Wrapper from './Wrapper';
import styles from './Sidebar.module.scss';

const Sidebar = async () => {
  const session = await auth();

  const items = getItems(session);

  return (
    <Wrapper>
      {session?.user && (
        <div className={styles.user}>
          <Avatar
            src={session.user.image}
            icon={<UserOutlined />}
            className={styles.avatar}
          />
          <div className={styles.username}>
            {session.user.name}
          </div>
        </div>
      )}
      <Menu theme="dark" mode="inline" items={items} />
    </Wrapper>
  );
};

export default Sidebar;
