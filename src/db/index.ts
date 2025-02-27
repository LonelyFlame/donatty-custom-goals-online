import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const db = drizzle(process.env.DB_FILE_NAME!, { schema });

export default db;
