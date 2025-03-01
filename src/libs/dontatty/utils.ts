import { API_BASE_URI } from './constants';

export const fmtApiUri = (refToken: string) => {
  const baseUri = API_BASE_URI;
  const G = 1;
  const q = 30;

  const n = refToken.length;
  const r = n - 2;
  const i = refToken.slice(r, n);
  const o = parseInt(i, 16);
  const s = G + (o % (q - G));
  const a = new Intl.NumberFormat("en-IN",{ minimumIntegerDigits: 3 }).format(s);

  return baseUri.replace("://api.", `://api-${a}.`);
};
