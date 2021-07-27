import { useLocale } from '@react-aria/i18n';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { fade } from '@material-ui/core/styles/colorManipulator';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import useSWR from 'swr';
import React, { FC } from 'react';
import Weather from '../../types/Weather';
import WeatherSummary from '../WeatherSummary';
import { getForecast } from '../../utils/api';
import { EIGHT_HOURS } from '../../constants';

type MultiZoneWeather = {
  [id: string]: Weather[];
};

const useStyles = makeStyles((theme) =>
  createStyles({
    summaryMap: {
      background: fade(theme.palette.background.paper, 0.5),
    },
    summaryCard: {
      marginBottom: theme.spacing(2),
    },
  }),
);

type Props = {
  zones: string[];
  hasMap: boolean;
};

const MultiSummary: FC<Props> = ({ zones, hasMap }) => {
  const { locale } = useLocale();
  const classes = useStyles();

  const { data } = useSWR<MultiZoneWeather>(
    `multi-${zones.join(',')}-${locale}`,
    () => {
      const out: MultiZoneWeather = {};

      for (const zone of zones) {
        out[zone] = getForecast(zone, locale);
      }

      return out;
    },
    { refreshInterval: EIGHT_HOURS },
  );

  return (
    <>
      {zones.map((zone) => (
        <Card
          key={`item-${zone}`}
          className={`${classes.summaryCard} ${
            hasMap ? classes.summaryMap : ''
          }`}
        >
          <Link href={`/zones/${kebabCase(zone)}`} passHref>
            <CardActionArea>
              <CardContent>
                <WeatherSummary
                  zoneID={zone}
                  isOverview={true}
                  data={data && data[zone]}
                />
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </>
  );
};

export default MultiSummary;
