import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

import { providers } from './providers';

export const authOptions: NextAuthConfig = {
  providers,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
