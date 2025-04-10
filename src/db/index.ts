import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const db = drizzle<typeof schema>(process.env.DB_FILE_NAME!, { schema });

export default db;
