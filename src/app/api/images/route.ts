import fs from "node:fs/promises";
import { existsSync } from "node:fs";

import { unauthorized } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/auth';
import { template } from '@/utils/strings';
import { getFileExt } from '@/utils/files';
import { validateFile } from '@/validation/file';
import UserRepository from '@/db/repositories/UserRepository';
import {
  FS_UPLOADS_PATH_IMAGES_FILE,
  FS_UPLOADS_PATH_IMAGES_FOLDER,
  FS_UPLOADS_PATH_USER,
  UPLOADS_FILE_URL,
} from '@/constants/files';

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

    const { isValid, errors} = validateFile(file);
    if (!isValid) {
      return Response.json({ message: 'File data is invalid', errors }, { status: 422 });
    }

    const folder = template(FS_UPLOADS_PATH_USER, { user: id });
    if (!existsSync(folder)) {
      await fs.mkdir(folder);
    }
    const imagesFolder = template(FS_UPLOADS_PATH_IMAGES_FOLDER, { user: id });
    if (!existsSync(imagesFolder)) {
      await fs.mkdir(imagesFolder);
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uuid = uuidv4();
    const fileExt = getFileExt(file.name);
    const fileName = `${uuid}.${fileExt}`;

    const path = template(FS_UPLOADS_PATH_IMAGES_FILE, { user: id, fileName });

    await fs.writeFile(path, buffer);

    const src = template(UPLOADS_FILE_URL, { user: id, fileName });
    return Response.json({ src });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
});
