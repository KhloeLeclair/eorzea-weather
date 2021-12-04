import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDateFormatter } from '@react-aria/i18n';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import Weather from '../../types/Weather';
import { useSettings } from '../../context/settings';
import { EIGHT_HOURS } from '../../constants';
import { getWeatherIcon } from '../../utils/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    faded: {
      '& p,& .MuiAvatar-root': {
        opacity: 0.3,
      },
    },
    highlight: {
      backgroundColor: theme.palette.action.selected,
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    flex: {
      display: 'flex',
      'z-index': 10,
    },
    past: {
      color: theme.palette.text.disabled,
    },
    current: {
      color: theme.palette.info.contrastText,
      backgroundColor: theme.palette.info.dark,
    },
    progress: {
      bottom: 0,
      left: 0,
      height: 4,
      position: 'absolute',
      right: 0,
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
    bg: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.25,
    },
    root: {
      paddingBottom: '15px',
      paddingTop: '15px',
      position: 'relative',
      '&:last-child': {
        paddingRight: theme.spacing(7),
      },
    },
  }),
);

type Props = {
  highlight?: boolean;
  value?: Weather;
  all?: Weather[];
};

const WeatherTableCell: FC<Props> = ({ highlight = false, value }) => {
  const settings = useSettings();

  const [now, setNow] = useState(() => Date.now());
  const dateFormatter = useDateFormatter({
    hour: 'numeric',
    minute: 'numeric',
  });
  const fullDateFormatter = useDateFormatter({
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    second: 'numeric',
    year: 'numeric',
  });
  const classes = useStyles();

  const startedAt = value ? value.startedAt : new Date(0);
  const time = startedAt.getTime(),
    end_time = time + EIGHT_HOURS,
    is_now = now >= time && now <= end_time,
    past = end_time < now;

  const fade =
    settings.state.hide_clear &&
    value &&
    (value.id === 'clearSkies' || value.id === 'fairSkies');

  useEffect(() => {
    let requestID: number;
    let is_raf: boolean;

    const loop = () => {
      const _now = Date.now();
      setNow(_now);

      if (_now <= end_time && _now >= time - 2000) {
        requestID = requestAnimationFrame(loop);
        is_raf = true;
      } else {
        let minimum = EIGHT_HOURS;
        if (_now < time) minimum = Math.min(minimum, time - 2000 - _now);

        requestID = setTimeout(loop, minimum) as unknown as number;
        is_raf = false;
      }
    };

    loop();

    return () => {
      if (is_raf) cancelAnimationFrame(requestID);
      else clearTimeout(requestID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, end_time]);

  let progress = null;

  if (is_now) {
    if (time >= now) progress = 0;
    else if (end_time < now) progress = 100;
    else progress = ((now - time) / EIGHT_HOURS) * 100;

    progress = (
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={progress}
      />
    );
  }

  return (
    <TableCell
      className={clsx(classes.root, {
        [classes.faded]: fade,
        [classes.highlight]: highlight,
        [classes.past]: past,
      })}
    >
      <div
        className={clsx(classes.bg, {
          [classes.current]: is_now,
        })}
      />
      <div className={classes.flex}>
        {settings.state.icons ? (
          value ? (
            <Avatar
              className={classes.avatar}
              alt={value.name}
              src={getWeatherIcon(value.id)}
            />
          ) : (
            <Avatar className={classes.avatar}>?</Avatar>
          )
        ) : null}
        <Typography color="inherit">
          {value ? (
            <>
              {value.name}{' '}
              <span className={past ? classes.past : classes.secondary}>
                (
                <time
                  dateTime={startedAt.toISOString()}
                  title={fullDateFormatter.format(startedAt)}
                >
                  {dateFormatter.format(startedAt)}
                </time>
                )
              </span>
            </>
          ) : (
            <Skeleton width="5rem" />
          )}
        </Typography>
      </div>
      {progress}
    </TableCell>
  );
};

export default WeatherTableCell;
