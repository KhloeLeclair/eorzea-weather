export type BoolOrNull = boolean | null;
export type Locale = 'en' | 'ja' | null;

export type State = {
  dark: BoolOrNull;
  locale: Locale;
  hide_clear: boolean;
  icons: boolean;
  backgrounds: boolean;
  summary: boolean;
  displaySeconds: boolean;
};

export type ActionType = 'load' | 'setbool' | 'clear' | 'setlocale';
export type ActionKey =
  | 'dark'
  | 'hide_clear'
  | 'icons'
  | 'backgrounds'
  | 'summary'
  | 'displaySeconds';

export type Action = {
  type: ActionType;
  key?: ActionKey;
  value?: boolean;
  locale?: Locale;
  state?: State;
};

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
