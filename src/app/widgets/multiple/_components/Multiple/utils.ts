import { template } from '@/utils/strings';

const { format } = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
export const getLabel = (
  text: string,
  amount: number,
  leverage: number,
  percentage: number,
): string => {

  const variables = {
    amount: format(amount),
    leverage: format(leverage),
    percentage: format(percentage * 100),
  };

  return template(text, variables);
};
