const USER_UPLOADS_FOLDER = 'users_files';

const FS_UPLOADS_PATH = `./public/${USER_UPLOADS_FOLDER}`;
export const FS_UPLOADS_PATH_USER = `${FS_UPLOADS_PATH}/{user}`;
export const FS_UPLOADS_PATH_FILE = `${FS_UPLOADS_PATH_USER}/{fileName}`;

const UPLOADS_URL = `/${USER_UPLOADS_FOLDER}`;
export const UPLOADS_FILE_URL = `${UPLOADS_URL}/{user}/{fileName}`;
