import type { WidgetOpposite } from '@/types/widgets';

const mockedData: WidgetOpposite = {
  name: 'some',
  leverage: 10000,
  liquid: true,
  goal: 'https://widgets.donatty.com/goal/?ref=8c26cd93-c72a-4c2b-80a2-d1a7574315cb&token=615P7GcaLTclac6BOzUPXZVYbgd7wz',
  color: '#123123',
  goalSecondary: 'https://widgets.donatty.com/goal/?ref=8c26cd93-c72a-4c2b-80a2-d1a7574315cb&token=615P7GcaLTclac6BOzUPXZVYbgd7wz',
  colorSecondary: '#321321',
};

export const getGoal = (_slug: string): WidgetOpposite => {
  return { ...mockedData };
}
