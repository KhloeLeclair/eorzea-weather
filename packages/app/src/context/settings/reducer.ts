import type { State, Action } from './types';

export default function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        ...action.state,
      };

    case 'setdark':
      return {
        ...state,
        dark: action.dark ?? null,
      };

    case 'sethideclear':
      return {
        ...state,
        hide_clear: action.hide_clear ?? false,
      };

    case 'seticons':
      return {
        ...state,
        icons: action.icons ?? false,
      };
  }

  return state;
}
