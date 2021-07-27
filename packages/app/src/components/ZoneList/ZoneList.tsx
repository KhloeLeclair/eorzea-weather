import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TocIcon from '@material-ui/icons/Toc';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useLocale, useMessageFormatter } from '@react-aria/i18n';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react';
import { useSettings } from '../../context/settings';
import { useZoneList } from '../../context/zone';
import { getCurrent, getWeatherStartTime } from '../../utils/api';
import { getWeatherIcon } from '../../utils/icons';
import Weather from '../../types/Weather';
import { EIGHT_HOURS } from '../../constants';
import messages from './intl';
import useSWR from 'swr';

type RawZoneWeather = {
  [id: string]: Weather[];
};

type ZoneWeather = {
  [id: string]: Weather;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    listAvatarWrap: {
      minWidth: 'unset',
      marginRight: theme.spacing(1),
    },
    listAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

const ZoneList: FC = () => {
  const settings = useSettings();
  const zoneList = useZoneList();
  const { locale } = useLocale();
  const classes = useStyles();
  const formatMessage = useMessageFormatter(messages);
  const [buster, setBuster] = useState(0);
  const [cached, setCached] = useState<ZoneWeather>({} as ZoneWeather);
  const [now, setNow] = useState(() => getWeatherStartTime(new Date()));
  const { data } = useSWR<RawZoneWeather>(
    'zone-list-current',
    () => {
      const out = {} as RawZoneWeather;

      for (const region of Object.values(zoneList)) {
        for (const zone of region.zones) {
          out[zone.id] = getCurrent(zone.id, locale);
        }
      }

      return out;
    },
    { refreshInterval: EIGHT_HOURS },
  );

  useEffect(() => {
    const loop = () => {
      const date = getWeatherStartTime(new Date());
      if (date !== now) setNow(date);
    };

    const requestID = setInterval(loop, 1000);

    return () => {
      clearInterval(requestID);
    };
  });

  useEffect(() => {
    if (!now || !cached) return;

    const values = Object.values(cached);
    if (!values || !values[0]) return;

    if (values[0].endedAt <= now) setBuster(buster + 1);
  }, [cached, buster, now]);

  useEffect(() => {
    if (!data || !now) return setCached({} as ZoneWeather);

    const out = {} as ZoneWeather;
    if (data) {
      for (const [zone, weather] of Object.entries(data)) {
        if (weather[1].startedAt <= now) out[zone] = weather[1];
        else out[zone] = weather[0];
      }
    }

    setCached(out);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, buster]);

  return (
    <Grid container justify="flex-start">
      {Object.entries(zoneList).map(([id, region]) => (
        <Grid item key={`grid-${id}`} md={3} sm={4} xs={12}>
          <List
            component="nav"
            subheader={
              <ListItem component="h2">
                <ListItemText secondary={region.name} />
                <ListItemSecondaryAction>
                  <Link href={`/overview/${kebabCase(id)}`} passHref>
                    <Tooltip title={formatMessage('overview')}>
                      <IconButton edge="end">
                        <TocIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            }
          >
            {region.zones.map((zone) => (
              <Link
                href={`/zones/${kebabCase(zone.id)}`}
                key={`item-${zone.id}`}
                passHref
              >
                <ListItem button component="a">
                  {settings.state.icons && cached && cached[zone.id] && (
                    <ListItemAvatar className={classes.listAvatarWrap}>
                      <Tooltip title={cached[zone.id].name}>
                        <Avatar
                          className={classes.listAvatar}
                          src={getWeatherIcon(cached[zone.id].id)}
                        />
                      </Tooltip>
                    </ListItemAvatar>
                  )}
                  <ListItemText primary={zone.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default ZoneList;
