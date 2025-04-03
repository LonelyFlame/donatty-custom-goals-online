import { ROUTES } from './routes';

const USER_UPLOADS_FOLDER = 'images';

const FS_UPLOADS_PATH = `./public/${USER_UPLOADS_FOLDER}`;
export const FS_UPLOADS_PATH_USER = `${FS_UPLOADS_PATH}/{user}`;
export const FS_UPLOADS_PATH_FILE = `${FS_UPLOADS_PATH_USER}/{fileName}`;

export const UPLOADS_FILE_URL = `${ROUTES.API_IMAGES}/{user}/{fileName}`;

// up to 5 MBytes
export const MAX_UPLOAD_IMAGE_SIZE = 5 // Bytes
  * 1024 // KBytes
  * 1024; // MBytes

export const ALLOWED_IMAGES_EXTENSIONS = ['png', 'gif', 'jpg', 'jpeg']
