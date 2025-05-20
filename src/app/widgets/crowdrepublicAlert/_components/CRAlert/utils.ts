export const getId = (project: string): number => {
  const { pathname } = new URL(project);
  const parts = pathname.split('/');

  const lastIndex = pathname.endsWith('/') ? parts.length - 2 : parts.length - 1;

  const id = parts[lastIndex];

  return Number(id);
};
