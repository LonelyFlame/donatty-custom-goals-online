import { deg2rad } from '@/utils/numbers';

type TPolygonPoints = [string, string, string, string, string, string, string];

const buildPositionString = (x: number, y: number): string => {
  return `${x.toFixed(5)}% ${y.toFixed(5)}%`;
}

const getPartPercents = (partDegrees: number, reverse?: boolean) => {
  let degrees = Math.min(partDegrees, 45);
  if (reverse) {
    degrees = degrees + 45;
  }

  const rads = deg2rad(degrees);

  const tan = Math.tan(rads);
  if (!reverse) {
    return tan * 50;
  }

  const ctg = 1 / tan;

  return 50 - (50 * ctg);
}

const getPolygonPoints = (degrees: number): TPolygonPoints => {
  const points: TPolygonPoints = [
    buildPositionString(50, 50),
    buildPositionString(50, 0),
    buildPositionString(50, 0),
    buildPositionString(50, 0),
    buildPositionString(50, 0),
    buildPositionString(50, 0),
    buildPositionString(50, 0),
  ];

  if (degrees >= 0) {
    const partPercents: number = getPartPercents(degrees);
    const x: number = 50 + partPercents;
    const y: number = 0;

    points[2] = buildPositionString(x, y);
    points[3] = buildPositionString(x, y);
    points[4] = buildPositionString(x, y);
    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 45) {
    const partPercents = getPartPercents(degrees - 45, true);
    const x = 100;
    const y = partPercents;

    points[3] = buildPositionString(x, y);
    points[4] = buildPositionString(x, y);
    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 90) {
    const partPercents = getPartPercents(degrees - 90);
    const x = 100;
    const y = 50 + partPercents;

    points[3] = buildPositionString(x, y);
    points[4] = buildPositionString(x, y);
    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 135) {
    const partPercents = getPartPercents(degrees - 135, true);
    const x = 100 - partPercents;
    const y = 100;

    points[4] = buildPositionString(x, y);
    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 180) {
    const partPercents = getPartPercents(degrees - 180);
    const x = 50 - partPercents;
    const y = 100;

    points[4] = buildPositionString(x, y);
    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 225) {
    const partPercents = getPartPercents(degrees - 225, true);
    const x = 0;
    const y = 100 - partPercents;

    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 270) {
    const partPercents = getPartPercents(degrees - 270);
    const x = 0;
    const y = 50 - partPercents;

    points[5] = buildPositionString(x, y);
    points[6] = buildPositionString(x, y);
  }
  if (degrees >= 315) {
    const partPercents = getPartPercents(degrees - 315, true);
    const x = partPercents;
    const y = 0;

    points[6] = buildPositionString(x, y);
  }

  return points;
}

export const getPolygon = (degrees: number): string => {
  const positions = getPolygonPoints(degrees);

  return `polygon(${positions.join(', ')})`
}

export const getDegrees = (percent: number, isHalf?: boolean, isOpposite?: boolean) => {
  let full = isHalf ? 180 : 360;
  if (isOpposite) {
    full = full / 2;
  }

  const resultPercent = Math.min(Math.abs(percent), 1);

  return Math.round(Math.min(full * resultPercent, full));
};
