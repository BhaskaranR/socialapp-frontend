import { isFunction, isString, has } from 'lodash';
import * as jwtDecode from 'jwt-decode';
import {
  AccountsError,
  validators,
  CreateUserType,
  LoginReturnType,
  UserObjectType,
  TokensType,
  ImpersonateReturnType,
} from '@accounts/common';


import {
  loggingIn,
  setUser,
  clearUser,
  setTokens,
  clearTokens as clearStoreTokens,
  setOriginalTokens,
  setImpersonated,
  clearOriginalTokens,
} from '../accounts/action';

import { hashPassword } from '../accounts/encryption';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountsClientConfiguration } from '../accounts/config';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { userFieldsFragment } from '@app/graphql/queries/user.fragment';
import { AccountGraphQLClient } from '@app/core/services/account-graphql.service';
import { TransportInterface } from '@app/core/accounts/transport-interface';
import { getUser, getLoggingIn, getIsLoading, AccountsState, getIsImpersonated, getOriginalTokens, getTokens } from '../accounts';
import { promise } from 'protractor';

const isValidUserObject = (user) =>
  has(user, 'username') || has(user, 'email') || has(user, 'id');

const ACCESS_TOKEN = 'accounts:accessToken';
const REFRESH_TOKEN = 'accounts:refreshToken';
const ORIGINAL_ACCESS_TOKEN = 'accounts:originalAccessToken';
const ORIGINAL_REFRESH_TOKEN = 'accounts:originalRefreshToken';

const getTokenKey = (type: string, options: AccountsClientConfiguration) =>
  isString(options.tokenStoragePrefix) && options.tokenStoragePrefix.length > 0
    ? `${options.tokenStoragePrefix}:${type}`
    : type;

@Injectable()
export class AccountsClient {
  private options: AccountsClientConfiguration;

  constructor(
    options: AccountsClientConfiguration,
    private storage: LocalStorageService,
    private store: Store<AccountsState>,
    private transport: TransportInterface
  ) {
    this.options = options;
  }


  public  async getStorageData(keyName: string) {
     return await  this.storage.getItem(keyName);
  }

  public async  setStorageData(keyName: string, value: any) {
    return await this.storage.setItem(keyName, value);
  }

  public async  removeStorageData(keyName: string) {
    return await this.storage.removeItem(keyName)
  }

  public async loadTokensFromStorage() {
    const at = await  this.getStorageData(getTokenKey(ACCESS_TOKEN, this.options)) ;
    const rt  = await this.getStorageData(getTokenKey(REFRESH_TOKEN, this.options))
    const tokens = {
      accessToken: at || null,
      refreshToken: rt || null,
    };

    this.store.dispatch(setTokens(tokens));
    return tokens;
  }

  public  async loadOriginalTokensFromStorage() {
    const oat = await  this.getStorageData(getTokenKey(ORIGINAL_ACCESS_TOKEN, this.options));
    const ort = await this.getStorageData(getTokenKey(ORIGINAL_REFRESH_TOKEN, this.options)) ;
    const tokens = {
      accessToken: oat || null,
      refreshToken: ort || null,
    };
    this.store.dispatch(setOriginalTokens(tokens));
    return tokens;
  }

  public async clearTokens() {
    this.store.dispatch(clearStoreTokens());
    await this.removeStorageData(getTokenKey(ACCESS_TOKEN, this.options));
    await this.removeStorageData(getTokenKey(REFRESH_TOKEN, this.options));
  }

  public  async storeTokens(tokens: TokensType) {
    if (tokens) {
      const newAccessToken = tokens.accessToken;
      if (newAccessToken) {
         await this.setStorageData(
          getTokenKey(ACCESS_TOKEN, this.options),
          newAccessToken
        );
      }

      const newRefreshToken = tokens.refreshToken;
      if (newRefreshToken) {
         await this.setStorageData(
          getTokenKey(REFRESH_TOKEN, this.options),
          newRefreshToken
        );
      }
    }
  }
  public  storeOriginalTokens(tokens: TokensType){
    if (tokens) {
      const originalAccessToken = tokens.accessToken;
      if (originalAccessToken) {
         this.setStorageData(
          getTokenKey(ORIGINAL_ACCESS_TOKEN, this.options),
          originalAccessToken
        );
      }

      const originalRefreshToken = tokens.refreshToken;
      if (originalRefreshToken) {
         this.setStorageData(
          getTokenKey(ORIGINAL_REFRESH_TOKEN, this.options),
          originalRefreshToken
        );
      }
    }
  }

  public clearUser() {
    this.store.dispatch(clearUser());
  }

  public async resumeSession(tokens) {
    try {
      return await this.refreshSession(tokens);
      /*if (
        this.options.onResumedSessionHook &&
        isFunction(this.options.onResumedSessionHook)
      ) {
        this.options.onResumedSessionHook();
      } */
    } catch (err) {
      throw err;
    }
  }

  public async  refreshSession({ accessToken, refreshToken }) {
  //   this.tokens().subscribe(async ({ accessToken, refreshToken }) => {
      if (accessToken && refreshToken) {
        try {
          this.store.dispatch(loggingIn(true));
          const decodedRefreshToken = jwtDecode(refreshToken);
          const currentTime = Date.now() / 1000;
          // Refresh token is expired, user must sign back in
          if (decodedRefreshToken.exp < currentTime) {
            await this.clearTokens();
            this.clearUser();
          } else {
            // Request a new token pair
            const refreshedSession = await this.transport.refreshTokens(
              accessToken,
              refreshToken

            );
            this.store.dispatch(loggingIn(false));

            this.storeTokens(refreshedSession.tokens);
            this.store.dispatch(setTokens(refreshedSession.tokens));
            this.store.dispatch(setUser(refreshedSession.user));
            return refreshedSession;
          }
        } catch (err) {
          this.store.dispatch(loggingIn(false));
          await this.clearTokens();
          this.clearUser();
          // throw new AccountsError('falsy token provided');
        }
      } else {
        await this.clearTokens();
        this.clearUser();
        // throw new AccountsError('no tokens provided');
      }
  }

  public async createUser(service, user: CreateUserType): Promise<void> {
    if (!user) {
      throw new AccountsError(
        'Unrecognized options for create user request',
        {
          username: user && user.username,
          email: user && user.email,
        },
        400
      );
    }
    if (!validators.validateUsername(user.username) && !validators.validateEmail(user.email)) {
      throw new AccountsError('Username or Email is required');
    }
    const userToCreate = {
      ...user,
    };
    try {
      const userId = await this.transport.createUser(service, userToCreate);
      const { onUserCreated } = this.options;

      if (isFunction(onUserCreated)) {
        try {
          await onUserCreated({ id: userId });
        } catch (err) {
          // tslint:disable-next-line no-console
          console.error(err);
        }
      }
    } catch (err) {
      throw new AccountsError(err.message);
    }
  }


  public async loginWithService(
    service: string,
    credentials: { [key: string]: string | object }
  ): Promise<LoginReturnType> {
    if (!isString(service)) {
      throw new AccountsError('Unrecognized options for login request');
    }

    try {
      this.store.dispatch(loggingIn(true));
      const response = await this.transport.loginWithService(service, credentials);
      this.store.dispatch(loggingIn(false));
      await this.storeTokens(response.tokens);
      this.store.dispatch(setTokens(response.tokens));
      this.store.dispatch(setUser(response.user));
      const { onSignedInHook } = this.options;
      if (isFunction(onSignedInHook)) {
        try {
          await onSignedInHook(response);
        } catch (err) {
          // tslint:disable-next-line no-console
          console.error(err);
        }
      }
      return response;
    } catch (err) {
      await this.clearTokens();
      this.store.dispatch(loggingIn(false));
      throw new AccountsError(err.message);
    }
  }

  public user()  {
    return this.store.select(getUser);
  }

  public loggingIn(): Observable<boolean> {
    return this.store.select(getLoggingIn);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(getIsLoading);
  }


  public isImpersonated(): Observable<boolean> {
    return this.store.select(getIsImpersonated);
  }

  public originalTokens(): Observable<TokensType> {
    return this.store.select(getOriginalTokens);
  }

  public tokens(): Observable<TokensType> {
    return this.store.select(getTokens);
  }

  public  logout(callback: (err?: Error) => void) {
    this.tokens().subscribe( async ({ accessToken }) => {
      debugger;
      try {
        if (accessToken) {
          this.transport.logout(accessToken);
        }
        await this.clearTokens();
        this.store.dispatch(clearUser());
        if (callback && isFunction(callback)) {
          callback();
        }
        if (this.options.onSignedOutHook) {
          this.options.onSignedOutHook();
        }
      } catch (err) {
        await this.clearTokens();
        this.store.dispatch(clearUser());
        if (callback && isFunction(callback)) {
          callback(err);
        }
        throw new AccountsError(err.message);
      }
    });
  }

  public async verifyEmail(token: string): Promise<void> {
    try {
      await this.transport.verifyEmail(token);
    } catch (err) {
      throw new AccountsError(err.message);
    }
  }

  public async resetPassword(
    token: string,
    newPassword: string
  ): Promise<void> {
    if (!validators.validatePassword(newPassword)) {
      throw new AccountsError('Password is invalid!');
    }

    const hashAlgorithm = this.options.passwordHashAlgorithm;
    const password = hashAlgorithm
      ? hashPassword(newPassword, hashAlgorithm)
      : newPassword;

    try {
      await this.transport.resetPassword(token, password);
    } catch (err) {
      throw new AccountsError(err.message);
    }
  }

  public async requestPasswordReset(email: string): Promise<void> {
    if (!validators.validateEmail(email)) {
      throw new AccountsError('Valid email must be provided');
    }
    try {
      await this.transport.sendResetPasswordEmail(email);
    } catch (err) {
      throw new AccountsError(err.message);
    }
  }

  public async requestVerificationEmail(email: string): Promise<void> {
    if (!validators.validateEmail(email)) {
      throw new AccountsError('Valid email must be provided');
    }
    try {
      await this.transport.sendVerificationEmail(email);
    } catch (err) {
      throw new AccountsError(err.message);
    }
  }
}
