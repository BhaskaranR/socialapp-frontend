/* import {ActionTypes } from './action';
import { UserObjectType, TokensType } from '@accounts/common';
import { UserFields } from '@app/graphql/types/types';

export interface Accounts {
    isLoading: boolean,
    user:  UserFields.Fragment | null,
    tokens:  TokensType | null,
    loggingIn: boolean,
    originalTokens: TokensType | undefined,
    isImpersonated: boolean,
}

 const initialState: Accounts = {
  isLoading: false,
  user: null ,
  tokens: null,
  originalTokens: null,
  loggingIn: false,
  isImpersonated: false,
};


export function accountsReducer(
  state: Accounts = initialState,
  action
): Accounts {
  const nextState = state;
  switch (action.type) {
    case ActionTypes.LOGIN: {
      break;
    }
    case ActionTypes.SET_USER: {
      const { user } = action.payload;
      return Object.assign( state, {user : user});
    }
    case ActionTypes.SET_TOKENS: {
      const { tokens } = action.payload;
      return Object.assign( state, {tokens : tokens});
    }
    case ActionTypes.CLEAR_TOKENS: {
      return Object.assign( state, {originalTokens : null,
        tokens: null
      });
    }
    case ActionTypes.CLEAR_USER: {
      return Object.assign( state, {user : null});
    }
    case ActionTypes.LOGGING_IN: {
      const { isLoggingIn } = action.payload;
      return Object.assign( state, {'loggingIn': isLoggingIn});
    }

    case ActionTypes.SET_ORIGINAL_TOKENS: {
      const { tokens } = action.payload;
      return Object.assign( state, {'originalTokens': tokens});
    }

    case ActionTypes.CLEAR_ORIGINAL_TOKENS: {
      return Object.assign( state, {'originalTokens': null});
    }

    case ActionTypes.SET_IMPERSONATED: {
      const { isImpersonated } = action.payload;
      return Object.assign( state, {'isImpersonated': isImpersonated});
    }
    default:
      break;
  }
  return nextState;
}


export const isLoading = (state: Accounts) => state.isLoading;

export const getUser = (state: Accounts) => state.user;

export const getTokens = (state: Accounts) => {
  return state.tokens ? state.tokens : {
    accessToken: null,
    refreshToken: null,
  }
};

export const getLoggingIn = (state: Accounts) => state.loggingIn;

export const getOriginalTokens = (state: Accounts) =>{  
  return state.originalTokens ?  state.originalTokens :  {
    accessToken: null,
    refreshToken: null,
  }
};

export const getIsImpersonated = (state: Accounts) => state.isImpersonated;

*/