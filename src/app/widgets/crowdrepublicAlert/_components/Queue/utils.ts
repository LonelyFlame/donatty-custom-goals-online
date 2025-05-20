import { template } from '@/utils/strings';

export const getLabel = (
  labelTemplate: string,
  title?: string,
  copies?: number,
  soldCopies?: number,
  backers?: number,
): string => {
  const variables = {
    title,
    copies,
    soldCopies,
    backers,
  };

  return template(labelTemplate, variables);
};
