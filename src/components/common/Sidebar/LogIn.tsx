import { signIn } from '@/auth';

import t from './translations';
import styles from './Sidebar.module.scss';

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitch");
      }}
    >
      {t.loginTwitch}
      <button type="submit" className={styles.item} />
    </form>
  );
};

export default SignIn;
