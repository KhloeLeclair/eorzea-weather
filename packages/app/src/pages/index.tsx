import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMessageFormatter } from '@react-aria/i18n';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Helmet } from 'react-helmet';
import Ad from '../components/Ad';
import ZoneList from '../components/ZoneList';
import messages from '../intl/home';

const useStyles = makeStyles((theme) =>
  createStyles({
    ad: {
      maxWidth: '100%',
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    buttonGroup: {
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(-3),
      '& a': {
        marginRight: theme.spacing(3),
      },
    },
    container: {
      padding: theme.spacing(1.5),
    },
    hero: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '30vh',
      padding: `${theme.spacing(10)}px 0`,
    },
  }),
);

const Home: NextPage = () => {
  const formatMessage = useMessageFormatter(messages);
  const classes = useStyles();

  return (
    <>
      <Helmet bodyAttributes={{ class: 'home' }}>
        <meta content={formatMessage('description')} name="description" />
      </Helmet>

      <div className={classes.hero}>
        <Typography color="inherit" component="h1" gutterBottom variant="h3">
          Eorzea Weather
        </Typography>

        <div className={classes.buttonGroup}>
          <Link as="/overview/eureka" href="/overview/eureka" passHref>
            <Button variant="contained" component="a">
              {formatMessage('eureka')}
            </Button>
          </Link>

          <Link as="/overview/bozja" href="/overview/bozja" passHref>
            <Button variant="contained" component="a">
              {formatMessage('bozja')}
            </Button>
          </Link>
        </div>
      </div>

      <main className={classes.container}>
        <ZoneList />
      </main>

      {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID &&
        process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT && (
          <Container maxWidth="md">
            <Ad
              className={classes.ad}
              slot={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT}
            />
          </Container>
        )}
    </>
  );
};

export default Home;
