export const getFileExt = (fileName: string): string => {
  const dotPosition = fileName.lastIndexOf('.') + 1;
  if (!dotPosition) return '';

  return fileName.substring(dotPosition);
}
