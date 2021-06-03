import range from 'lodash/range';
import EorzeaWeather from 'eorzea-weather';
import { HOUR, EIGHT_HOURS, ONE_DAY } from '../constants';
import Weather from '../types/Weather';

function getStartTime(date: Date): Date {
  const msec = date.getTime();
  const bell = (msec / HOUR) % 24;
  const startMsec = msec - Math.round(HOUR * bell);
  return new Date(startMsec);
}

export function getForecast(id: string, locale: string): Weather[] {
  const weather = new EorzeaWeather(id, { locale });

  if (!weather.validate()) throw new Error('Invalid zone ID');

  const startTime = getStartTime(new Date()).getTime() - ONE_DAY * 2;
  const weathers = range(startTime, startTime + ONE_DAY * 10, EIGHT_HOURS).map(
    (time) => {
      const startedAt = new Date(time),
        endedAt = new Date(time + EIGHT_HOURS),
        id = weather.getWeatherId(startedAt);

      return {
        id,
        name: weather.translate(`weathers.${id}`),
        startedAt,
        endedAt,
      };
    },
  );

  return weathers;
}
