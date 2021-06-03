import type { State, Action } from './types';

export default function settingsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        ...action.state,
      };

    case 'setbool':
      if (action.key && action.value !== undefined)
        return {
          ...state,
          [action.key]: action.value,
        };

      return state;

    case 'clear':
      if (action.key)
        return {
          ...state,
          [action.key]: undefined,
        };
      return state;

    case 'setlocale':
      return {
        ...state,
        locale: action.locale ?? null,
      };
  }

  return state;
}
