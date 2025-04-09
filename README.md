This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

**First**, copy `.env.example` to `.env` and fill all variables. *Some hints*:

`TWITCH_CLIENT_ID=qqqwwweeerrr` - you can get it at https://dev.twitch.tv/console/apps

`TWITCH_CLIENT_SECRET=qqqwwweeerrr` - you can get it at https://dev.twitch.tv/console/apps

`AUTH_SECRET="qqqwwweeerrr"` - You can quickly create a good value on the command line via this openssl command. `openssl rand -base64 32`

`DB_FILE_NAME=file:local.db`

`NEXT_PUBLIC_ALERTS_CURRENCY=` - populate with some if want to use as. separate with comma

`NEXT_PUBLIC_BASE_URI="http://localhost:3000"`

`NEXT_PUBLIC_CONTACT_EMAIL="test.test@mail.com"`

`NEXT_PUBLIC_MAINTENANCE_DATE=` - just leave it empty


**Second**, run DB migrations: `npm i -D drizzle-kit`

**Third**, build your server: `npm run build`

**Finally**, run it: `npm start`!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
