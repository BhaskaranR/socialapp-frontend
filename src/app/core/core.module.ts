import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer, StoreModule, Store, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '@env/environment';
import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { reducer, Accounts } from './accounts/reducer';
import { AuthGuardService } from '@app/core/services/auth-guard.service';


import { GraphQLClient } from '@accounts/graphql-client';
import { AccountsClient } from './services/account.service';
import { AccountsClientConfiguration } from '@app/core/accounts/config';
import { TransportInterface } from './accounts/transport-interface';
import { AccountsState } from './accounts/index';
import { Apollo } from 'apollo-angular';
import { AccountGraphQLClient } from './services/account-graphql.service';

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(debug);
}


const options: AccountsClientConfiguration = {
  storeKey: 'accounts',
  passwordHashAlgorithm: "sha256",
  onSignedOutHook: () => null,
  onEnrollAccountHook: () => null,
  onResetPasswordHook: () => null,
  onVerifyEmailHook: () => null,
  onSignedInHook: () => null,
};



export function provideAccountClientService(options: AccountsClientConfiguration) {
  return {
    provide: AccountsClient,
    useFactory: (
      storage: LocalStorageService,
      store: Store<AccountsState>,
      transport: AccountGraphQLClient) => new AccountsClient(options, storage, store, transport),
    deps: [LocalStorageService, Store, AccountGraphQLClient]
  }
}


export interface State {
  accounts: Accounts
}

export const reducers: ActionReducerMap<State> = {
  accounts: reducer
};


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
      { metaReducers }
    ),
    EffectsModule.forRoot([])
  ],
  declarations: [],
  providers: [LocalStorageService, AuthGuardService,
    AccountGraphQLClient,
    provideAccountClientService(options),
    { provide: "storage", useClass: LocalStorageService },
    { provide: "store", useClass: Store },
    { provide: "transport", useExisting: AccountGraphQLClient },
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
