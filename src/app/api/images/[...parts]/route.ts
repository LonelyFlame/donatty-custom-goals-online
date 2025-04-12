import { promises as fs } from 'fs';

import { auth } from '@/auth';
import { template } from '@/utils/strings';
import { FS_UPLOADS_PATH_IMAGES_FILE } from '@/constants/files';

export const GET = auth(async (request, { params }) => {
  try {
    const parts = (await params)?.parts || [];
    const [user, fileName] = Array.isArray(parts) ? parts : [parts];
    const path = template(FS_UPLOADS_PATH_IMAGES_FILE, { user, fileName });

    const fileContent = await fs.readFile(path)
    if (!fileContent) {
      return Response.json({ message: 'File not found' }, { status: 404 });
    }

    return new Response(fileContent);
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
