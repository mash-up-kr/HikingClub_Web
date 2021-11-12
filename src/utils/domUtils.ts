export const getRootElement = () =>
  document.getElementById('root') ||
  document.getElementById('__next') ||
  (document.getElementsByTagName('body')[0] as HTMLElement);
