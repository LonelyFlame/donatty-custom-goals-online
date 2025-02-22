import { signOut } from '@/auth';
import styles from './Sidebar.module.scss';

import t from './translations';

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      {t.logout}
      <button type="submit" className={styles.item} />
    </form>
  );
};

export default SignIn;
