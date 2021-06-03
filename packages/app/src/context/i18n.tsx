import { I18nProvider } from '@react-aria/i18n';
import React, { FC, useEffect, useState } from 'react';
import { useSettings } from './settings';
import { AVAILABLE_LOCALES } from '../constants';

export const Provider: FC = ({ children }) => {
  const settings = useSettings();
  const [locale, setLocale] = useState('en');
  const has_nav = typeof navigator === 'object' && navigator.languages;

  useEffect(() => {
    if (settings.state.locale) return setLocale(settings.state.locale);

    if (has_nav) {
      for (let lang of navigator.languages) {
        lang = lang.split(/-/)[0];
        if (AVAILABLE_LOCALES[lang]) return setLocale(lang);
      }
    }

    setLocale('en');
  }, [settings, has_nav]);

  return <I18nProvider locale={locale}>{children}</I18nProvider>;
};
