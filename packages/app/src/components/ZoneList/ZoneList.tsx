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
import React, { FC } from 'react';
import { useSettings } from '../../context/settings';
import { useZoneList } from '../../context/zone';
import { getCurrent } from '../../utils/api';
import { getWeatherIcon } from '../../utils/icons';
import Weather from '../../types/Weather';
import { EIGHT_HOURS } from '../../constants';
import messages from './intl';
import useSWR from 'swr';

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
  const { data } = useSWR<ZoneWeather>(
    'zone-list-current',
    () => {
      const out = {} as ZoneWeather;

      for (const region of Object.values(zoneList)) {
        for (const zone of region.zones) {
          out[zone.id] = getCurrent(zone.id, locale);
        }
      }

      return out;
    },
    { refreshInterval: EIGHT_HOURS },
  );

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
                  {settings.state.icons && data && data[zone.id] && (
                    <ListItemAvatar className={classes.listAvatarWrap}>
                      <Tooltip title={data[zone.id].name}>
                        <Avatar
                          className={classes.listAvatar}
                          src={getWeatherIcon(data[zone.id].id)}
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
