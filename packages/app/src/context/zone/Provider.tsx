import { useLocale } from '@react-aria/i18n';
import EorzeaWeather from 'eorzea-weather';
import React, { FC, useMemo } from 'react';
import { EORZEA_ZONE_LIST } from '../../constants';
import Context from './Context';

import { Locale } from 'src/utils/api';

const Provider: FC = ({ children }) => {
  const { locale } = useLocale();

  const zones = useMemo(
    () =>
      EORZEA_ZONE_LIST.reduce(
        (result, id) => ({
          ...result,
          [id]: {
            id,
            name: new EorzeaWeather(id, {
              locale: locale as Locale,
            }).getZoneName(),
          },
        }),
        {},
      ),
    [locale],
  );

  return <Context.Provider value={{ zones }}>{children}</Context.Provider>;
};

export default Provider;
