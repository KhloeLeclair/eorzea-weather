export const HOUR = 175 * 1000;
export const EIGHT_HOURS = 8 * HOUR;
export const ONE_DAY = 24 * HOUR;

export function getWeatherStartTime(date: Date): Date {
  const msec = date.getTime();
  const bell = (msec / HOUR) % 8;
  const startMsec = msec - Math.round(HOUR * bell);
  return new Date(startMsec);
}

export function getDayStartTime(date: Date): Date {
  const msec = date.getTime();
  const bell = (msec / HOUR) % 24;
  const startMsec = msec - Math.round(HOUR * bell);
  return new Date(startMsec);
}