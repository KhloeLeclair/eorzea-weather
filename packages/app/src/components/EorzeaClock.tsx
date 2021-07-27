import Typography from '@material-ui/core/Typography';
import EorzeaTime from 'eorzea-time';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSettings } from '../context/settings';

const EORZEAN_MINUTE_TO_SECONDS: number = 60 / (1440 / 70);

const EorzeaClock: FC = () => {
  const settings = useSettings();

  const [date] = useState<EorzeaTime>(() => new EorzeaTime());
  const [printed, setPrinted] = useState(
    date.toString(settings.state.displaySeconds),
  );

  useEffect(() => {
    let requestID: number;
    let isRAF: boolean;

    const loop = () => {
      isRAF = settings.state.displaySeconds;
      date.update();
      setPrinted(date.toString(isRAF));
      if (isRAF) requestID = requestAnimationFrame(loop);
      else
        requestID = setTimeout(
          loop,
          1000 * EORZEAN_MINUTE_TO_SECONDS,
        ) as unknown as number;
    };

    isRAF = settings.state.displaySeconds;
    if (isRAF) requestID = requestAnimationFrame(loop);
    else
      requestID = setTimeout(
        loop,
        1000 * EORZEAN_MINUTE_TO_SECONDS,
      ) as unknown as number;

    return () => {
      if (isRAF) cancelAnimationFrame(requestID);
      else clearTimeout(requestID);
    };
  }, [settings, date]);

  const handleClick = useCallback(() => {
    const seconds = !settings.state.displaySeconds;

    settings.dispatch({
      type: 'setbool',
      key: 'displaySeconds',
      value: seconds,
    });

    setPrinted(date.toString(seconds));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <Typography
      color="inherit"
      variant="body2"
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      suppressHydrationWarning
    >
      ET {printed ? printed : '--:--:--'}
    </Typography>
  );
};

export default EorzeaClock;
