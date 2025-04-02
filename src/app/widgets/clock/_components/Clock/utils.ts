export const calculateDegrees = (
  percent: number,
  isHalf?: boolean,
  isOpposite?: boolean
): number => {
  let full = isHalf ? 180 : 360;
  if (isOpposite) {
    full = full / 2;
  }

  return full * percent;
}
