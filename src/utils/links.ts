export const BASE_URL = 'https://yohyama0216.github.io/next-go-app';

export const withBase = (path: string): string => {
  if (!path) return BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${BASE_URL}${path}`;
  return `${BASE_URL}/${path}`;
};
