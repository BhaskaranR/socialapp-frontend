import { TransportInterface } from './transport-interface';
import config from './config';
import { UserObjectType } from '@accounts/common';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as acc from './reducer'

export {reducer} from './reducer';

export interface AccountsState {
    accounts: acc.Accounts
}

export const getAccountsState = createFeatureSelector<acc.Accounts>('accounts');

export const getIsLoading = createSelector(
    getAccountsState,
    acc.isLoading
);

export const getUser = createSelector(
    getAccountsState,
    (state) => {
        debugger;
        return state.user
    }
);

export const getTokens = createSelector(
    getAccountsState,
    acc.getTokens
);


export const getLoggingIn = createSelector(
    getAccountsState,
    acc.getLoggingIn
);

export const getOriginalTokens = createSelector(
    getAccountsState,
    acc.getOriginalTokens
);

export const getIsImpersonated = createSelector(
    getAccountsState,
    acc.getIsImpersonated
);
