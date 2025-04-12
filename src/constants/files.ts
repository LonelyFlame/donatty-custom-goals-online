import { ROUTES } from './routes';

const FS_UPLOADS_PATH = `./public/uploads`;
export const FS_UPLOADS_PATH_USER = `${FS_UPLOADS_PATH}/{user}`;
export const FS_UPLOADS_PATH_IMAGES_FOLDER = `${FS_UPLOADS_PATH_USER}/images`;
export const FS_UPLOADS_PATH_IMAGES_FILE = `${FS_UPLOADS_PATH_IMAGES_FOLDER}/{fileName}`;

export const UPLOADS_FILE_URL = `${ROUTES.API_IMAGES}/{user}/{fileName}`;

// up to 5 MBytes
export const MAX_UPLOAD_IMAGE_SIZE = 5 // Bytes
  * 1024 // KiBytes
  * 1024; // MiBytes

export const ALLOWED_IMAGES_EXTENSIONS = ['png', 'gif', 'jpg', 'jpeg']
