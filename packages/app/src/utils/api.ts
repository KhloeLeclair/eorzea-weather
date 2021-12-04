import range from 'lodash/range';
import EorzeaWeather from 'eorzea-weather';
import { HOUR, EIGHT_HOURS, ONE_DAY } from '../constants';
import Weather, { PossibleWeather } from '../types/Weather';

type Zone = typeof EorzeaWeather.ZONE_AMH_ARAENG;

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

export type Locale = 'en' | 'de' | 'fr' | 'ja';

export function getCurrent(zone: Zone, locale: Locale): Weather[] {
  const weather = new EorzeaWeather(zone, { locale });

  if (!weather.validate()) throw new Error('Invalid zone ID');

  const startTime = getWeatherStartTime(new Date()).getTime(),
    startedAt = new Date(startTime),
    endedAt = new Date(startTime + EIGHT_HOURS),
    id = weather.getWeatherId(startedAt),
    next_id = weather.getWeatherId(endedAt);

  return [
    {
      id,
      name: weather.translate(`weathers.${id}`),
      startedAt,
      endedAt,
    },
    {
      id: next_id,
      name: weather.translate(`weathers.${next_id}`),
      startedAt: endedAt,
      endedAt: new Date(startTime + EIGHT_HOURS + EIGHT_HOURS),
    },
  ];
}

export function getForecast(zone: Zone, locale: Locale): Weather[] {
  const weather = new EorzeaWeather(zone, { locale });

  if (!weather.validate()) throw new Error('Invalid zone ID');

  const startTime = getDayStartTime(new Date()).getTime() - ONE_DAY * 2;
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

export function getPossibleWeathers(
  zone: Zone,
  locale: Locale,
): PossibleWeather[] {
  const weather = new EorzeaWeather(zone, { locale });
  if (!weather.validate()) throw new Error('Invalid zone ID');

  return weather.getPossibleWeathers().map((id) => {
    return {
      id,
      name: weather.translate(`weathers.${id}`),
    } as PossibleWeather;
  });
}
