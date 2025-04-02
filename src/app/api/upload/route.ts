import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { unauthorized } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/auth';
import { template } from '@/utils/strings';
import { getFileExt } from '@/utils/files';
import UserRepository from '@/db/repositories/UserRepository';
import { FS_UPLOADS_PATH_FILE, FS_UPLOADS_PATH_USER, UPLOADS_FILE_URL } from '@/constants/files';

export const POST = auth(async (request) => {
  const session = request.auth;
  const email = session?.user?.email;
  if (!email) {
    return unauthorized();
  }

  const user = await UserRepository.findOrCreateByEmail(email);
  const id = user?.id;
  if (!id) {
    return Response.json({ message: 'Something went wrong on file upload. User is unavailable.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ message: 'File is missed' }, { status: 422 });
    }
    const fileSize = file.size;
    if (fileSize > 0) {
      // TODO: Validate Size;
    }

    const fileExt = getFileExt(file.name);
    if (!fileExt) {
      // TODO: Validate file ext;
    }

    const folder = template(FS_UPLOADS_PATH_USER, { user: id });
    if (!existsSync(folder)) {
      await fs.mkdir(folder);
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uuid = uuidv4();
    const fileName = `${uuid}.${fileExt}`;

    const path = template(FS_UPLOADS_PATH_FILE, { user: id, fileName });

    await fs.writeFile(path, buffer);

    const src = template(UPLOADS_FILE_URL, { user: id, fileName });
    return Response.json({ src });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
