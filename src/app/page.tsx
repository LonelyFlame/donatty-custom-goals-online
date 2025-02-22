import { PropsWithChildren } from 'react';
import Image from "next/image";

import { auth, signIn, signOut } from '@/auth';

import styles from "./page.module.css";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitch");
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">
        Sign in with Twitch
      </button>
    </form>
  );
}

function SignOut({ children }: PropsWithChildren) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">
        Sign out
      </button>
    </form>
  );
}

export default async function Home() {
  const session = await auth();
  const user = session?.user?.email;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {user && <SignOut>{`Welcome ${user}`}</SignOut>}
        {!user && <SignIn />}
      </main>
    </div>
  );
}