export const getFormattedTime = time => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
