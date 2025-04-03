import { ALLOWED_IMAGES_EXTENSIONS, MAX_UPLOAD_IMAGE_SIZE } from '../constants/files';
import { getFileExt } from '../utils/files';

export const validateFile = (file?: File): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!file) {
    errors.file = 'required';

    return { isValid: false, errors };
  }

  const fileSize = file.size;
  if (fileSize > MAX_UPLOAD_IMAGE_SIZE) {
    errors.file = 'size';

    return { isValid: false, errors };
  }

  const fileExt = getFileExt(file.name);
  if (!fileExt || !ALLOWED_IMAGES_EXTENSIONS.includes(fileExt)) {
    errors.file = 'extension';

    return { isValid: false, errors };
  }

  return { isValid: true, errors };
};
