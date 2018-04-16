import { Action } from '@ngrx/store';
import { Route } from '@angular/router';

export enum ActionTypes {
  LOGIN = '[ACCOUNTS] LOGIN',
  SET_USER = '[ACCOUNTS] SET_USER',
  SET_ACCOUNT= '[ACCOUNTS] SET_ACCOUNT',
  SET_TOKENS = '[ACCOUNTS] SET_TOKENS',
  CLEAR_TOKENS = '[ACCOUNTS] CLEAR_TOKENS',
  CLEAR_USER = '[ACCOUNTS] CLEAR_USER',
  LOGGING_IN = '[ACCOUNTS] LOGGING_IN',
  SET_ORIGINAL_TOKENS = '[ACCOUNTS] SET_ORIGINAL_TOKENS',
  CLEAR_ORIGINAL_TOKENS = '[ACCOUNTS] CLEAR_ORIGINAL_TOKENS',
  SET_IMPERSONATED = '[ACCOUNTS] SET_IMPERSONATED'
};

export const loggingIn = isLoggingIn => ({
  type: ActionTypes.LOGGING_IN,
  payload: {
    isLoggingIn,
  },
});

export const setUser = user => ({
  type: ActionTypes.SET_USER,
  payload: {
    user,
  },
});

export const setTokens = tokens => ({
  type: ActionTypes.SET_TOKENS,
  payload: {
    tokens,
  },
});

export const setAccount = (account) => ({
  type: ActionTypes.SET_ACCOUNT,
  payload:{ account }
});

export const clearTokens = () => ({
  type: ActionTypes.CLEAR_TOKENS,
});

export const clearUser = () => ({
  type: ActionTypes.CLEAR_USER,
});

export const setOriginalTokens = tokens => ({
  type: ActionTypes.SET_ORIGINAL_TOKENS,
  payload: {
    tokens,
  },
});

export const clearOriginalTokens = () => ({
  type: ActionTypes.CLEAR_ORIGINAL_TOKENS,
});

export const setImpersonated = isImpersonated => ({
  type: ActionTypes.SET_IMPERSONATED,
  payload: {
    isImpersonated,
  },
});
