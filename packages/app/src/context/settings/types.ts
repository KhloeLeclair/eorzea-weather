export type BoolOrNull = boolean | null;

export type State = {
  dark: BoolOrNull;
  hide_clear: boolean;
  icons: boolean;
};

export type ActionType = 'load' | 'setdark' | 'sethideclear' | 'seticons';

export type Action = {
  type: ActionType;
  dark?: BoolOrNull;
  hide_clear?: boolean;
  icons?: boolean;
  state?: State;
};

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
