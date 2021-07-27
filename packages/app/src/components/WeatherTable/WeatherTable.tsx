import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocale, useMessageFormatter } from '@react-aria/i18n';
import camelCase from 'lodash/camelCase';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';
import Weather, { PossibleWeather } from '../../types/Weather';
import WeatherSummary from '../WeatherSummary';
import WeatherTableCell from './WeatherTableCell';
import messages from './intl';
import { useSettings, ActionKey } from '../../context/settings';
import { getForecast, getPossibleWeathers } from '../../utils/api';
import { getWeatherIcon } from '../../utils/icons';
import { EIGHT_HOURS } from '../../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    formGroup: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    formLabel: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    spacedLabel: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    summary: {
      margin: 8,
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(2),
    },
    paper: {
      marginBottom: theme.spacing(4),
      marginTop: 0,
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    table: {
      tableLayout: 'fixed',
    },
    thinHeader: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    tableCell: {
      '&:last-child': {
        paddingRight: theme.spacing(7),
      },
    },
    switchContainer: {
      display: 'flex',
    },
    switchIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  }),
);

type Props = {
  zoneID: string;
};

const WeatherTable: FC<Props> = ({ zoneID }) => {
  const settings = useSettings();

  const [highlightedWeathers, setHighlightedWeathers] = useState<string[]>([]);
  const { locale } = useLocale();
  const messageFormatter = useMessageFormatter(messages);
  const { data: weatherTypes } = useSWR<PossibleWeather[]>(
    `zone-possible-${zoneID}-${locale}`,
    () => {
      const collator = new Intl.Collator(locale);
      return getPossibleWeathers(camelCase(zoneID), locale).sort((a, b) =>
        collator.compare(a.name, b.name),
      );
    },
    { refreshInterval: EIGHT_HOURS },
  );
  const { data: weatherTable } = useSWR<Weather[]>(
    `zone-${zoneID}-${locale}`,
    () => {
      return getForecast(camelCase(zoneID), locale);
    },
    { refreshInterval: EIGHT_HOURS },
  );
  const classes = useStyles();

  const handleSettingToggle = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = target;
      settings.dispatch({
        type: 'setbool',
        key: value as ActionKey,
        value: checked,
      });
    },
    [settings],
  );

  const handleFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = target;

      if (value) {
        setHighlightedWeathers((values) => {
          const newValues = [...values];
          const index = values.indexOf(value);

          if (index >= 0) {
            newValues.splice(index, 1);
          } else if (checked) {
            newValues.push(value);
          }

          return newValues.sort();
        });
      }
    },
    [],
  );

  useEffect(() => {
    const raw = location.hash.slice(1);
    const out = [];
    if (raw) {
      const type_ids = weatherTypes
        ? weatherTypes.map((entry) => entry.id)
        : null;
      for (const entry of raw.split(',')) {
        if (entry && (!type_ids || type_ids.includes(entry))) out.push(entry);
      }
    }

    setHighlightedWeathers(out);
  }, [weatherTypes, zoneID]);

  useEffect(() => {
    if (!weatherTypes) return;

    const raw = location.toString();
    const url = new URL(raw);
    if (highlightedWeathers.length) url.hash = highlightedWeathers.join(',');
    else url.hash = '';

    const result = url.toString();
    if (result !== raw) history.replaceState(history.state, '', result);
  }, [weatherTypes, highlightedWeathers]);

  return (
    <>
      {settings.state.summary ? (
        <div className={classes.summary}>
          <WeatherSummary zoneID={zoneID} data={weatherTable} />
        </div>
      ) : null}
      <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.tableCell + ' ' + classes.thinHeader}
              >
                ET 00:00 - 07:59
              </TableCell>
              <TableCell
                className={classes.tableCell + ' ' + classes.thinHeader}
              >
                ET 08:00 - 15:59
              </TableCell>
              <TableCell
                className={classes.tableCell + ' ' + classes.thinHeader}
              >
                ET 16:00 - 23:59
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherTable
              ? chunk(weatherTable, 3).map((weatherTableForDay) => (
                  <TableRow
                    key={`row-${weatherTableForDay[0].startedAt.getTime()}`}
                  >
                    {weatherTableForDay.map((weather) => (
                      <WeatherTableCell
                        highlight={highlightedWeathers.includes(weather.id)}
                        key={`cell-${weather.startedAt.getTime()}`}
                        value={weather}
                      />
                    ))}
                  </TableRow>
                ))
              : chunk(range(30), 3).map((values) => (
                  <TableRow key={`row-${values.join(':')}`}>
                    {values.map((value) => (
                      <WeatherTableCell key={`cell-${value}`} />
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormLabel className={classes.formLabel}>
        {messageFormatter('highlight')}
      </FormLabel>

      {weatherTypes ? (
        <FormGroup className={classes.formGroup} row>
          {weatherTypes.map((entry) => {
            const control = (
              <Switch
                color="primary"
                onChange={handleFilterChange}
                checked={highlightedWeathers.includes(entry.id)}
                value={entry.id}
              />
            );
            const label = settings.state.icons ? (
              <div className={classes.switchContainer}>
                <Avatar
                  className={classes.switchIcon}
                  src={getWeatherIcon(entry.id)}
                />
                {entry.name}
              </div>
            ) : (
              entry.name
            );
            return (
              <FormControlLabel
                control={control}
                key={entry.id}
                label={label}
                labelPlacement="bottom"
              />
            );
          })}
        </FormGroup>
      ) : (
        <FormGroup className={classes.formGroup} row>
          {range(3).map((value) => {
            const control = <Switch color="primary" disabled value={value} />;
            return (
              <FormControlLabel
                control={control}
                key={`label-${value}`}
                label={<Skeleton width="3rem" />}
              />
            );
          })}
        </FormGroup>
      )}

      <FormLabel className={classes.formLabel + ' ' + classes.spacedLabel}>
        {messageFormatter('other')}
      </FormLabel>

      <FormGroup className={classes.formGroup} row>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              value="icons"
              checked={settings.state.icons}
              onChange={handleSettingToggle}
            />
          }
          label={messageFormatter('icons')}
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              value="summary"
              checked={settings.state.summary}
              onChange={handleSettingToggle}
            />
          }
          label={messageFormatter('summary')}
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              value="hide_clear"
              checked={settings.state.hide_clear}
              onChange={handleSettingToggle}
            />
          }
          label={messageFormatter('hide_clear')}
        />
      </FormGroup>
    </>
  );
};

export default WeatherTable;
