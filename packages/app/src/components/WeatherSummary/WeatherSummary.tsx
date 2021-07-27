import { blueGrey, amber } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  useDateFormatter,
  useLocale,
  useMessageFormatter,
} from '@react-aria/i18n';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import Weather from '../../types/Weather';
import { useSettings } from '../../context/settings';
import { useZone } from '../../context/zone';
import messages from './intl';
import { HOUR, EIGHT_HOURS, ONE_DAY } from '../../constants';
import { getWeatherIcon } from '../../utils/icons';

import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Duration from 'dayjs/plugin/duration';

import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import { Helmet } from 'react-helmet';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

const SIX_HOURS = 6 * HOUR,
  EIGHTEEN_HOURS = 18 * HOUR;

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      width: 64,
      height: 64,
    },
    listAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    sunAvatar: {
      color: amber['A700'],
      backgroundColor: 'transparent',
    },
    moonAvatar: {
      color: theme.palette.getContrastText(blueGrey[800]),
      backgroundColor: blueGrey[800],
    },
    aside: {
      paddingRight: theme.spacing(2),
    },
    thinList: {
      margin: 0,
      padding: 0,
      paddingLeft: theme.spacing(2),
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(-2),
      color: theme.palette.text.secondary,
      '& strong': {
        fontWeight: 400,
        color: theme.palette.text.primary,
      },
    },
    time: {
      fontVariant: 'tabular-nums',
    },
    root: {
      display: 'flex',
      position: 'relative',
    },
  }),
);

type Props = {
  zoneID: string;
  isOverview?: boolean;
  data?: Weather[];
};

type FirstWeather = {
  [id: string]: Weather;
};

type Cache = {
  current: Weather;
  until: Weather;
  weathers: FirstWeather;
} | null;

function formatNearTime(time: Date, now: number, fmt: string | null) {
  if (!fmt || time.getTime() - now > 300000) return dayjs(time).fromNow(true);
  else return dayjs.duration(dayjs(time).diff(now)).format(fmt);
}

const WeatherSummary: FC<Props> = ({ zoneID, isOverview, data }) => {
  const settings = useSettings();
  const { locale } = useLocale();
  const classes = useStyles();
  const zone = useZone({ id: zoneID });
  const [buster, setBuster] = useState(0);
  const [cached, setCached] = useState<Cache>(null);
  const [now, setNow] = useState(() => Date.now());
  const formatMessage = useMessageFormatter(messages);

  const short_format = messages[locale]?.short_format ?? null;

  dayjs.locale(locale);

  const fullDateFormatter = useDateFormatter({
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    second: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const loop = () => {
      setNow(Date.now());
    };

    const requestID = setInterval(loop, 1000);

    return () => {
      clearInterval(requestID);
    };
  }, []);

  useEffect(() => {
    if (now && cached && cached.current.endedAt.getTime() <= now)
      setBuster(buster + 1);
  }, [cached, buster, now]);

  useEffect(() => {
    if (!data || !now || !zone) return setCached(null);

    let current = null,
      until = null,
      streak = false;

    const weathers = {} as FirstWeather;

    if (data && now) {
      for (let i = 0; i < data.length; i++) {
        const entry = data[i],
          id = entry.id,
          time = entry.startedAt.getTime();

        if (time + EIGHT_HOURS < now) continue;

        if (!weathers[id]) weathers[id] = entry;

        if (current == null && time <= now && now <= time + EIGHT_HOURS) {
          current = until = entry;
          streak = true;
        } else if (streak) {
          if (current && current.id === entry.id) until = entry;
          else streak = false;
        }
      }
    }

    if (current) delete weathers[current.id];

    if (current && until) setCached({ current, until, weathers });
    else setCached(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, zone, buster]);

  const day_progress = now % ONE_DAY,
    day_start = now - day_progress;

  let evening: number | Date | null = day_start + EIGHTEEN_HOURS;
  let morning: number | Date | null = day_start + SIX_HOURS;

  if (now > evening) morning += ONE_DAY;

  if (now < morning) {
    morning = new Date(morning);
    evening = null;
  } else {
    morning = null;
    evening = new Date(evening);
  }

  return (
    <div className={clsx(classes.root, {})}>
      {!isOverview && cached?.current && (
        <Helmet>
          <link
            rel="shortcut icon"
            href={getWeatherIcon(cached.current.id, true)}
          />
          <title>
            {cached.current.name} -{' '}
            {formatNearTime(cached.until.endedAt, now, short_format)} -{' '}
            {zone.name}
          </title>
        </Helmet>
      )}
      <aside className={classes.aside}>
        {cached ? (
          <Avatar
            className={classes.avatar}
            alt={cached.current.name}
            src={getWeatherIcon(cached.current.id, true)}
          />
        ) : (
          <Avatar className={classes.avatar}>?</Avatar>
        )}
      </aside>
      <div>
        {cached ? (
          <>
            <Typography variant="subtitle1">
              {formatMessage('current', {
                // eslint-disable-next-line react/display-name
                b: (chunks: string) => <strong>{chunks}</strong>,
                // eslint-disable-next-line react/display-name
                t: (chunks: string) => (
                  <time
                    className={classes.time}
                    dateTime={cached.until.endedAt.toISOString()}
                    title={fullDateFormatter.format(cached.until.endedAt)}
                  >
                    {chunks}
                  </time>
                ),
                weather: cached.current.name,
                zone: zone.name,
                remaining: formatNearTime(
                  cached.until.endedAt,
                  now,
                  short_format,
                ),
              })}
            </Typography>
            <ul className={classes.thinList}>
              {morning instanceof Date ? (
                <li className={classes.listItem}>
                  {settings.state.icons ? (
                    <Avatar
                      className={classes.listAvatar + ' ' + classes.sunAvatar}
                    >
                      <WbSunnyIcon />
                    </Avatar>
                  ) : null}
                  <div>
                    {formatMessage('day', {
                      // eslint-disable-next-line react/display-name
                      b: (chunks: string) => <strong>{chunks}</strong>,
                      // eslint-disable-next-line react/display-name
                      t: (chunks: string) => (
                        <time
                          className={classes.time}
                          dateTime={(morning as Date).toISOString()}
                          title={fullDateFormatter.format(morning as Date)}
                        >
                          {chunks}
                        </time>
                      ),
                      when: formatNearTime(morning, now, short_format),
                    })}
                  </div>
                </li>
              ) : null}
              {evening instanceof Date ? (
                <li className={classes.listItem}>
                  {settings.state.icons ? (
                    <Avatar
                      className={classes.listAvatar + ' ' + classes.moonAvatar}
                    >
                      <NightsStayIcon />
                    </Avatar>
                  ) : null}
                  <div>
                    {formatMessage('night', {
                      // eslint-disable-next-line react/display-name
                      b: (chunks: string) => <strong>{chunks}</strong>,
                      // eslint-disable-next-line react/display-name
                      t: (chunks: string) => (
                        <time
                          className={classes.time}
                          dateTime={(evening as Date).toISOString()}
                          title={fullDateFormatter.format(evening as Date)}
                        >
                          {chunks}
                        </time>
                      ),
                      when: formatNearTime(evening, now, short_format),
                    })}
                  </div>
                </li>
              ) : null}
              {Object.entries(cached.weathers).map(([key, entry]) => {
                return (
                  <li key={`item-${key}`} className={classes.listItem}>
                    {settings.state.icons ? (
                      <Avatar
                        className={classes.listAvatar}
                        src={getWeatherIcon(entry.id)}
                      />
                    ) : null}
                    <div>
                      {formatMessage('weather', {
                        // eslint-disable-next-line react/display-name
                        b: (chunks: string) => <strong>{chunks}</strong>,
                        // eslint-disable-next-line react/display-name
                        t: (chunks: string) => (
                          <time
                            className={classes.time}
                            dateTime={entry.startedAt.toISOString()}
                            title={fullDateFormatter.format(entry.startedAt)}
                          >
                            {chunks}
                          </time>
                        ),
                        weather: entry.name,
                        when: formatNearTime(
                          entry.startedAt,
                          now,
                          short_format,
                        ),
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <Skeleton width="15rem" />
            <ul className={classes.thinList}>
              <li>
                <Skeleton width="10rem" />
              </li>
              <li>
                <Skeleton width="7rem" />
              </li>
              <li>
                <Skeleton width="5rem" />
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherSummary;
