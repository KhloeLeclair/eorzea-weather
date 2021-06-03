import type { AppProps } from 'next/app';
import Router from 'next/router';
import React, { FC, useCallback, useEffect } from 'react';
import Layout from '../components/Layout';
import Theme from '../components/Theme';
import { Provider as ZoneProvider } from '../context/zone';
import { Provider as SettingsProvider } from '../context/settings';
import { Provider as I18nProvider } from '../context/i18n';
import tracker from '../utils/tracker';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const handleRouteChangeComplete = useCallback((url: string) => {
    tracker.track({
      path: url,
      title: document.title,
    });
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [handleRouteChangeComplete]);

  useEffect(() => {
    const renderedStyles = document.getElementById('jss-server-side');

    renderedStyles?.parentNode?.removeChild(renderedStyles);
  }, []);

  return (
    <SettingsProvider>
      <I18nProvider>
        <Theme>
          <ZoneProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ZoneProvider>
        </Theme>
      </I18nProvider>
    </SettingsProvider>
  );
};

export default MyApp;
