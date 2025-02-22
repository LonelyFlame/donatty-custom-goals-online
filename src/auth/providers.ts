import TwitchProvider from 'next-auth/providers/twitch';

export const providers = [
  TwitchProvider({
    clientId: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
  }),
];
