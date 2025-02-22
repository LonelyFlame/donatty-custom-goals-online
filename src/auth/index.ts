import NextAuth from 'next-auth';
import { providers } from './providers';

export const authOptions = {
  providers,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
