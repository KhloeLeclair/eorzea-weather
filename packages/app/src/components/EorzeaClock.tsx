import Typography from '@material-ui/core/Typography';
import EorzeaTime from 'eorzea-time';
import React, { FC, useEffect, useState } from 'react';

const EorzeaClock: FC = () => {
  const [date] = useState<EorzeaTime>(() => new EorzeaTime());
  const [printed, setPrinted] = useState(date.toString());

  useEffect(() => {
    let requestID: number;

    const loop = () => {
      date.update();
      setPrinted(date.toString());
      requestID = requestAnimationFrame(loop);
    };

    requestID = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, [date]);

  return (
    <Typography color="inherit" variant="body2" suppressHydrationWarning>
      ET {printed ? printed : '--:--:--'}
    </Typography>
  );
};

export default EorzeaClock;
