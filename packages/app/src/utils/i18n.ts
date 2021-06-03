import { AVAILABLE_LOCALES } from '../constants';

let debug = false;
if (process && process.env.NODE_ENV === 'development') debug = true;

export type Locale = {
  [id: string]: string;
};

export type LocaleDict = {
  [id: string]: Locale;
};

const has = (obj: unknown, prop: symbol | string) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

export default function localeProxy(
  locales: LocaleDict,
  fallback = 'en',
): LocaleDict {
  if (!locales[fallback]) throw new Error('Fallback locale missing');
  if (typeof Proxy !== 'function') return localeFallback(locales, fallback);

  const out = {} as LocaleDict;
  const fb = locales[fallback];

  for (const locale of Object.keys(AVAILABLE_LOCALES)) {
    const data = locales[locale];
    out[locale] = new Proxy(data ?? {}, {
      get(target, prop) {
        if (typeof prop === 'string') {
          if (has(target, prop)) return target[prop];
          if (target !== fb && has(fb, prop))
            return debug ? `MISSING: ${fb[prop]}` : fb[prop];
        }

        return undefined;
      },

      set: () => {
        throw new Error('Messages read only');
      },
    });
  }

  return out;
}

export function localeFallback(
  locales: LocaleDict,
  fallback = 'en',
): LocaleDict {
  if (!locales[fallback]) throw new Error('Fallback locale missing');

  const out = {} as LocaleDict;
  const fb = (out[fallback] = locales[fallback]);

  for (const locale of Object.keys(AVAILABLE_LOCALES)) {
    if (locale === fallback) continue;
    const data = locales[locale];
    if (!data) out[locale] = fb;
    else {
      out[locale] = {
        ...fb,
        ...data,
      };
    }
  }

  return out;
}
