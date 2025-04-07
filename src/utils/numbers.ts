export const deg2rad = (degrees: number) => {
  return degrees * (Math.PI / 180);
}

export const roundPercents = (percent: number): number => {
  return Math.round(percent * 100) / 100;
}

export const matchPercents = (first: number, second: number): boolean => {
  return roundPercents(first) === roundPercents(second);
}
