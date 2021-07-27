import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMessageFormatter } from '@react-aria/i18n';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Helmet } from 'react-helmet';
import Ad from '../../components/Ad';
import MultiSummary from '../../components/MultiSummary';
import React from 'react';
import messages from '../../intl/overview';
import { camelCase, kebabCase } from 'lodash';
import { areaMap, useZoneList } from '../../context/zone/hooks';
import { ZONE_MAPS } from '../../constants';
import { useSettings } from '../../context/settings';

const useStyles = makeStyles((theme) =>
  createStyles({
    ad: {
      maxWidth: '100%',
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    headline: {
      margin: [
        `${theme.spacing(1)}px`,
        `${theme.spacing(0.75)}px`,
        `${theme.spacing(3)}px`,
      ].join(' '),
    },
    root: {
      margin: '16px auto',
      maxWidth: '100%',
      width: 1240,
    },
  }),
);

type Props = {
  id: string;
};

const Overview: NextPage<Props> = ({ id }) => {
  const settings = useSettings();
  const formatMessage = useMessageFormatter(messages);
  const classes = useStyles();
  const regions = useZoneList();
  const region = regions[id],
    zones: string[] | undefined = areaMap[id];

  if (!zones) throw new Error('Invalid zone');

  const title = formatMessage('title', { region: region.name });

  const random_zone = zones[Math.floor(Math.random()*zones.length)];
  const map = settings.state.backgrounds ? ZONE_MAPS[random_zone] : null;
  const hasMap = map != null;

  return (
    <>
      <Helmet bodyAttributes={{ class: 'overview' }}>
        <style>{hasMap ? `:root {--map-image: url("${map}");}` : ''}</style>
        <title>{title}</title>
      </Helmet>

      <main className={classes.root}>
        <Typography className={classes.headline} variant="subtitle1">
          {title}
        </Typography>

        {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID &&
          process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT && (
            <Container maxWidth="md">
              <Ad
                className={classes.ad}
                slot={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT}
              />
            </Container>
          )}

        <MultiSummary zones={zones} hasMap={hasMap} />
      </main>
    </>
  );
};

export default Overview;

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  if (!params?.id) return Promise.reject(new TypeError('id is required'));
  const id = camelCase(params.id);
  if (!areaMap[id]) return Promise.reject(new Error('invalid overview id'));

  return Promise.resolve({
    props: {
      id,
    } as Props,
  });
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = Object.keys(areaMap).map((id) => ({
    params: {
      id: kebabCase(id),
    },
  }));

  return Promise.resolve({
    fallback: false,
    paths,
  });
};
