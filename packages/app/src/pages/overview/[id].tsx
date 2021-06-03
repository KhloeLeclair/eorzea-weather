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

const ZONES = {
  eureka: ['eurekaAnemos', 'eurekaPagos', 'eurekaPyros', 'eurekaHydatos'],
  bozja: ['bozjanSouthernFront', 'zadnor'],
} as RegionZones;

type RegionZones = {
  [id: string]: string[];
};

type Region = 'bozja' | 'eureka';

type Props = {
  id: Region;
};

const Overview: NextPage<Props> = ({ id }) => {
  const formatMessage = useMessageFormatter(messages);
  const classes = useStyles();
  const zones = ZONES[id];

  const title = formatMessage(`${id}_title`);

  return (
    <>
      <Helmet bodyAttributes={{ class: 'overview' }}>
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

        <MultiSummary zones={zones} />
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
  if (!ZONES[id]) return Promise.reject(new Error('invalid overview id'));

  return Promise.resolve({
    props: {
      id,
    } as Props,
  });
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = Object.keys(ZONES).map((id) => ({
    params: {
      id: kebabCase(id),
    },
  }));

  return Promise.resolve({
    fallback: false,
    paths,
  });
};
